import { UserModel } from '@/lib/models'
import { User, UserRole } from '@/lib/types'
import connectDB from '@/lib/utils/connectDB'
import session from '@/lib/utils/session'
import jwt from 'jsonwebtoken'

if (!process.env.DYNAMIC_PUBLIC_KEY)
  throw new Error(
    'No DYNAMIC_PUBLIC_KEY was found in the Environment Variables Please add it'
  )

const publicKey = process.env.DYNAMIC_PUBLIC_KEY

export async function GET(req: Request) {
  // Get Current Session
  const currentSession = await session().all()
  // Get Authorization Header
  const authToken = req.headers.get('authorization')?.split(' ')[1] || null // Get Bearer token

  // If no Authorization Header was found
  if (!authToken)
    return new Response(
      "<authorization: Bearer __token__> couldn't be found in the headers",
      {
        status: 404,
      }
    )

  let decoded = {} as any,
    isVerified = false

  // Verify the Token and get the decoded data
  jwt.verify(authToken, publicKey!, function (err, decodedRes) {
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
    if (!!currentSession) await session().destroy()
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

  // If the current session is the same as the new one
  if (currentSession?.address === state.address)
    return Response.json(currentSession)

  // Connect to the Database
  await connectDB()

  // Create a new User in MongoDB
  const newUser = new UserModel({
    address: state.address,
    email: state.email,
  })

  // Save the new User
  try {
    await newUser.save()
  } catch (e: any) {
    console.error(e?.message || 'No Error Message was Found')
  }

  // Set the new Session
  await session().setAll(state)

  // Return the new Session
  return Response.json(state)
}
