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
      sparse: true,
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

const setModel = () => model('users', UserSchema)

if (!models.users) setModel()

const users = models.users as ReturnType<typeof setModel>

export default users
