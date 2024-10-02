import { ApiSecret } from './api'

export enum EUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER = 'SUPER',
}

export type UserRole = keyof typeof EUserRole

export type User = {
  uid: string
  address: string
  role: UserRole
  email?: string
  apiSecrets: ApiSecret[]
  webHookUrl?: string
  createdAt: Date
  updatedAt: Date
}
