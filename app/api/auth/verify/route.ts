import { UserModel } from '@/lib/models'
import { Auth, HTTPError } from '@/lib/types'
import { handleApiResponse } from '@/lib/utils'
import { getBearer } from '@/lib/utils/bearer'
import session from '@/lib/utils/session'
import jwt from 'jsonwebtoken'

if (!process.env.DYNAMIC_PUBLIC_KEY)
  throw new Error(
    'No DYNAMIC_PUBLIC_KEY was found in the Environment Variables Please add it'
  )

const publicKey = process.env.DYNAMIC_PUBLIC_KEY.replace(/\\n/g, '\n')

export async function GET(req: Request) {
  return await handleApiResponse(async () => {
    // Get Authorization Header
    const authToken = getBearer(req) // Get Bearer token

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

    const existingUser = await UserModel.findOne({
      address: state.address,
    }).lean()

    // Update State and handle session
    if (!!existingUser) {
      state.role = existingUser.role
      await session().setAll(state)
    } // Create a new User in MongoDB and handle session
    else {
      try {
        const newUser = new UserModel({
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
