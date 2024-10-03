import { Hex } from 'viem'

enum EProjectStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
}

type ProjectStatus = keyof typeof EProjectStatus

enum EVoteSentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
}

type VoteSentiment = keyof typeof EVoteSentiment

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
}
