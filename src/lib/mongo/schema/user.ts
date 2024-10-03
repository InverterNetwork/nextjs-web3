import { Schema } from 'mongoose'
import { EUserRole, User as TUser } from '../types'
import { ApiSecret } from './api-secret'

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
    username: {
      type: String,
      unique: true,
      sparse: true,
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
