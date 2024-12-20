import nextAppSession, { promisifyStore } from 'next-app-session'
import MongoStore from 'connect-mongo'
import { connectDb } from './connect-db'
import { User } from '@/types'

export const session = nextAppSession<Partial<User>>({
  name: 'session-sid', // The cookie name that will hold sid
  secret: process.env.SESSION_SECRET, // Providing a secret will sign the SID before storing it in the cookie, providing extra security
  // Assign mongoo store
  store: promisifyStore(
    MongoStore.create({
      clientPromise: connectDb().then((res) => res?.connection.getClient()),
      stringify: false,
    })
  ),
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
})

export type Session = typeof session
