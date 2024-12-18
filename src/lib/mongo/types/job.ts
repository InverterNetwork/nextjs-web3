export enum EJobType {
  EXAMPLE = 'EXAMPLE',
}

export type JobType = keyof typeof EJobType
