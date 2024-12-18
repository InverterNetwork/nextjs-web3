import { model, models } from 'mongoose'
import { UserSchema } from '../schemas'

const setModel = () => model('users', UserSchema)

if (!models.users) setModel()

export const UserModel = models.users as ReturnType<typeof setModel>
