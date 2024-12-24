'use server'

import { type Hex } from 'viem'
import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import { session } from './session'
import { UserModel } from '@/lib/mongo'
import { UserRole } from '@/types'
import { headers } from 'next/headers'
import { splitBearerToken } from '../main'
import { authorized } from '@inverter-network/sdk'

// Owner only
export async function ownerOnly(): Promise<{ role: UserRole; address: Hex }> {
  const { address, role } = await getUserRoleFromTokenOrSession()

  authorized(!!address, 'User is not authorized')

  return { address, role }
}

// Updated adminOnly function
export async function adminOnly(): Promise<{ role: UserRole; address: Hex }> {
  const { role, address } = await getUserRoleFromTokenOrSession()

  authorized(role)

  const isAdmin = ['ADMIN', 'SUPER'].includes(role)
  authorized(isAdmin, 'User is not an admin')

  return { role, address }
}

// Updated superOnly function
export async function superOnly(): Promise<{ role: UserRole; address: Hex }> {
  const { role, address } = await getUserRoleFromTokenOrSession()

  authorized(role)

  const isSuper = role === 'SUPER'
  authorized(isSuper, 'User is not a super admin')

  return { role, address }
}

async function getUserRoleFromTokenOrSession(): Promise<{
  role: UserRole
  address: Hex
}> {
  const token = (await headers()).get('authorization')?.split(' ')[1]
  const sessionRole = <UserRole | undefined>await session().get('role')
  const sessionAddress = <Hex | undefined>await session().get('address')

  if (sessionRole && sessionAddress) {
    return { role: sessionRole, address: sessionAddress }
  }

  authorized(token, 'No Bearer Token provided')

  const { key, secret } = splitBearerToken(token)

  const user = await UserModel.findOne(
    { 'apiSecrets.uid': key },
    { 'apiSecrets.$': 1, role: 1, address: 1 }
  ).lean()

  const hashedSecret = user?.apiSecrets?.find(
    (secret) => secret.uid === key
  )?.hashedSecret

  authorized(hashedSecret, 'No matching apiSecret found')

  const isValidSecret = await compareApiSecret(secret, hashedSecret)
  authorized(isValidSecret, 'Invalid API secret')

  return {
    role: user!.role as UserRole,
    address: user!.address as Hex,
  }
}

const scryptAsync = promisify(scrypt)

// Function to hash an API secret
export async function hashApiSecret(apiSecret: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = (await scryptAsync(apiSecret, salt, 64)) as Buffer
  return `${salt}:${hash.toString('hex')}`
}

// Function to compare a provided API secret with a hashed one
export async function compareApiSecret(
  providedSecret: string,
  storedHash: string
) {
  const [salt, key] = storedHash.split(':')
  const hash = (await scryptAsync(providedSecret, salt, 64)) as Buffer
  return key === hash.toString('hex')
}
