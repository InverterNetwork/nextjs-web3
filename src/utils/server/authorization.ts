'use server'

import { type Hex } from 'viem'
import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import session from './session'
import { model } from '@/lib/mongo'
import bearer from '../main/bearer'
import { UserRole } from '@/types'
import { authorized } from '../guards'

export async function ownerOnly(token?: string) {
  const sessionAddress = <Hex | undefined>await session().get('address')

  let isOwner = false
  let address: Hex | undefined

  if (!!sessionAddress) {
    address = sessionAddress
    isOwner = true
  } else {
    authorized(token, 'No Bearer Token provided')

    const { key, secret } = bearer.split(token)

    const user = await model.User.findOne(
      { 'apiSecrets.uid': key },
      { 'apiSecrets.$': 1, address: 1 }
    ).lean()

    const hashedSecret = user?.apiSecrets?.[0]?.hashedSecret

    authorized(hashedSecret, 'No matching apiSecret found')

    isOwner = await compareApiSecret(secret, hashedSecret)
    address = user!.address as Hex
  }

  authorized(isOwner)

  return address as Hex
}

export async function adminOnly(): Promise<UserRole> {
  const role = <UserRole | undefined>await session().get('role')

  authorized(role)

  const isAdmin = ['ADMIN', 'SUPER'].includes(role)
  authorized(isAdmin)

  return role
}

export async function superOnly(): Promise<UserRole> {
  const role = <UserRole | undefined>await session().get('role')

  authorized(role)

  const isSuper = role === 'SUPER'
  authorized(isSuper)

  return role
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
