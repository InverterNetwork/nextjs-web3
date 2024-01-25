import { Schema, model, models } from 'mongoose'
import { User, EUserRole } from '../types'
import { ApiSecretSchema } from '../schemas/ApiSecret'

const UserSchema = new Schema<User>(
  {
    uid: {
      type: String,
      required: true,
      immutable: true,
      default: function () {
        return (this as any)._id.toString()
      },
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'USER',
      enum: EUserRole,
    },
    email: {
      type: String,
      unique: true,
    },
    apiSecrets: {
      type: [ApiSecretSchema],
      default: [],
    },
    webHookUrl: {
      type: String,
    },
  },
  { timestamps: true }
)

const getModel = () => model('users', UserSchema)

let UserModel: ReturnType<typeof getModel>
if (!models.users) UserModel = getModel()

export default UserModel!
