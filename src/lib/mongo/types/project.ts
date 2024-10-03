import { Hex } from 'viem'

export enum EProjectStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
}

export type ProjectStatus = keyof typeof EProjectStatus

export enum EVoteSentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

export type VoteSentiment = keyof typeof EVoteSentiment

export type Vote = {
  sentiment: VoteSentiment
  voterAddress: Hex
  weight: number
}

export type Project = {
  uid: string
  name: string
  description: string
  ownerAddress: Hex
  orchestratorAddress?: Hex
  votes: Vote[]
  members: Hex[]
  status: ProjectStatus
  twitterHandle?: string
  telegramHandle?: string
  websiteURL?: string
}
