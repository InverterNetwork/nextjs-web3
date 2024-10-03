import { Schema } from 'mongoose'
import { ApiSecret as TApiSecret } from '../types'

export const ApiSecret = new Schema<TApiSecret>(
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
