import { model, models } from 'mongoose'
import schema from '../schema'

const setModel = () => model('user', schema.User)

if (!models.users) setModel()

export const User = models.users as ReturnType<typeof setModel>
