export type ApiSecret = {
  uid: string
  title: string
  hashedSecret: string
  createdAt: Date
  updatedAt: Date
}

export enum EEventType {
  USER_CHANGE = 'USER_CHANGE',
}

export type EventType = keyof typeof EEventType

export type EventMeta = {
  operationType: EventType
  uid: string
}
