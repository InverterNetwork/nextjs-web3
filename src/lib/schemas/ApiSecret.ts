import { Schema } from 'mongoose'
import { ApiSecret } from '../types'

export const ApiSecretSchema = new Schema<ApiSecret>(
  {
    uid: {
      type: String,
      required: true,
      immutable: true,
    },
    title: {
      type: String,
      required: true,
    },
    hashedSecret: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
)
