import { model } from '@/lib/mongo'
import { Auth, HTTPError } from '@/types'
import utils from '@/utils'
import session from '@/utils/server/session'
import jwt from 'jsonwebtoken'

const nullablePublicKey = process.env.DYNAMIC_PUBLIC_KEY,
  publicKey = !!nullablePublicKey
    ? nullablePublicKey.replace(/\\n/g, '\n')
    : undefined

export async function GET(req: Request) {
  return await utils.apiResponse(async () => {
    if (!publicKey) throw new HTTPError('Public Key is not defined', 500)

    // Get Authorization Header
    const authToken = utils.bearer.get(req) // Get Bearer token

    // If no Authorization Header was found
    if (authToken === 'undefined') {
      await session().destroy()
      throw new HTTPError(
        "<authorization: Bearer __token__> couldn't be found in the headers",
        404
      )
    }

    let decoded = {} as any,
      isVerified = false

    // Verify the Token and get the decoded data
    jwt.verify(authToken!, publicKey, function (err, decodedRes) {
      if (!err) {
        isVerified = true
        decoded = decodedRes
        return
      }
      throw new HTTPError(err.message, 401)
    })

    // If the token is not verified
    if (!isVerified) {
      // Destroy the current session
      await session().destroy()
      return new HTTPError('UnAuthorized Auth Token is not valid', 401)
    }

    const state: Omit<Auth, 'isAuth'> = {
      // @ts-ignore
      address: decoded?.verified_credentials?.[0]?.address,
      // @ts-ignore
      email: decoded?.verified_credentials?.[0]?.email,
      role: 'USER',
    }

    const existingUser = await model.User.findOne({
      address: state.address,
    }).lean()

    // Update State and handle session
    if (!!existingUser) {
      state.role = existingUser.role
      await session().setAll(state)
    } // Create a new User in MongoDB and handle session
    else {
      try {
        const newUser = new model.User({
          address: state.address,
          email: state.email,
        })

        // Save the new User
        await newUser.save()

        await session().setAll(state)
      } catch (e: any) {
        throw e
      }
    }

    // Return the new Session
    return state
  })
}
