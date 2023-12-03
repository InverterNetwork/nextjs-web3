import { UserModel } from '@/lib/models'
import { User, UserRole } from '@/lib/types'
import connectDB from '@/lib/utils/connectDB'
import session from '@/lib/utils/session'
import jwt from 'jsonwebtoken'

if (!process.env.DYNAMIC_PUBLIC_KEY)
  throw new Error(
    'No DYNAMIC_PUBLIC_KEY was found in the Environment Variables Please add it'
  )

const publicKey = process.env.DYNAMIC_PUBLIC_KEY.replace(/\\n/g, '\n')

export async function GET(req: Request) {
  // Get Authorization Header
  const authToken = req.headers.get('authorization')?.split(' ')[1] // Get Bearer token

  // If no Authorization Header was found
  if (authToken === 'undefined') {
    await session().destroy()
    return new Response(
      "<authorization: Bearer __token__> couldn't be found in the headers",
      {
        status: 404,
      }
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
    console.error(err)
  })

  // If the token is not verified
  if (!isVerified) {
    // Destroy the current session
    await session().destroy()
    return new Response('Un Authorized Auth Token is not valid', {
      status: 401,
    })
  }

  const state: User = {
    // @ts-ignore
    address: decoded?.verified_credentials?.[0]?.address,
    // @ts-ignore
    email: decoded?.verified_credentials?.[0]?.email,
    role: UserRole.User,
  }

  // Connect to the DB
  await connectDB()

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
        ...(!!state.email && { email: state.email }),
      })

      // Save the new User
      await newUser.save()

      await session().setAll(state)
    } catch (e: any) {
      throw e
    }
  }

  // Return the new Session
  return Response.json(state)
}
