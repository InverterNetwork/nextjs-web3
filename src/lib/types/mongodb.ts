import { Mongoose } from 'mongoose'

declare global {
  var mongoose: {
    promise: ReturnType<Mongoose['connect']> | null
    conn: Mongoose | null
  }
}
