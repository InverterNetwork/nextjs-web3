export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
  Super = 'SUPER',
}

export type User = {
  address: string
  role: UserRole
  email?: string
}
