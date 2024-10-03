import { User } from '.'

export type Auth = Omit<
  User,
  'createdAt' | 'updatedAt' | 'apiSecrets' | 'uid'
> & {
  isAuth: boolean
}
