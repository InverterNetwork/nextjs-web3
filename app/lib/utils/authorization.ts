'use server'

import session from '@/lib/utils/session'
import connectDB from './connectDB'
import { UserRole } from '../types'

export async function adminOnly() {
  await connectDB()
  const role = <UserRole | undefined>await session().get('role')

  if (!role) throw new Error('Unauthorized')

  const isAdmin = [UserRole.Admin, UserRole.Super].includes(role)

  if (!isAdmin) throw new Error('Unauthorized')
}

export async function superOnly() {
  await connectDB()
  const role = <UserRole | undefined>await session().get('role')

  if (!role) throw new Error('Unauthorized')

  const isAdmin = [UserRole.Super].includes(role)

  if (!isAdmin) throw new Error('Unauthorized')
}
