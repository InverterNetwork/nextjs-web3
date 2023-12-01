'use server'

import session from './session'
import connectDB from './connectDB'
import { UserRole } from '../types'

export default async function adminOnly() {
  await connectDB()
  const role = <UserRole>await session().get('role')

  const isAdmin = [UserRole.Admin, UserRole.Super].includes(role)

  if (!isAdmin) {
    throw new Error('Unauthorized')
  }
}
