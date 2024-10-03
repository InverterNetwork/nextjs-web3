import { model, models } from 'mongoose'
import schema from '../schema'

const setModel = () => model('users', schema.User)

if (!models.users) setModel()

export const User = models.users as ReturnType<typeof setModel>