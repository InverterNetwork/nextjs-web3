import { Schema, model, models } from 'mongoose'
import { MongoGenericModel, User, UserRole } from '../types'

const UserSchema = new Schema<User>({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.User,
  },
  email: {
    type: String,
    unique: true,
  },
})

const UserModel =
  (models.users as MongoGenericModel<typeof UserSchema>) ||
  model('users', UserSchema)

export default UserModel
