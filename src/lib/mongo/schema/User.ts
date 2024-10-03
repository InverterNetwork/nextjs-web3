import { Schema } from 'mongoose'
import { EUserRole, User as TUser } from '../types'
import { ApiSecret } from './ApiSecret'

export const User = new Schema<TUser>(
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
      type: [ApiSecret],
      default: [],
    },
    webHookUrl: {
      type: String,
    },
  },
  { timestamps: true }
)
