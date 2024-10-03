import { Schema } from 'mongoose'
import { EProjectStatus, EVoteSentiment, Project as TProject } from '../types'

export const Vote = new Schema(
  {
    sentiment: {
      type: String,
      enum: EVoteSentiment,
      required: true,
    },
    voterAddress: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export const Project = new Schema<TProject>(
  {
    uid: {
      type: String,
      required: true,
      immutable: true,
      default: function () {
        return (this as any)._id.toString()
      },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    twitterHandle: {
      type: String,
      unique: true,
      sparse: true,
    },
    telegramHandle: {
      type: String,
      unique: true,
      sparse: true,
    },
    websiteURL: {
      type: String,
      unique: true,
      sparse: true,
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    orchestratorAddress: {
      type: String,
    },
    votes: {
      type: [Vote],
      default: [],
    },
    members: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: EProjectStatus,
      default: EProjectStatus.PENDING,
    },
  },
  { timestamps: true }
)
