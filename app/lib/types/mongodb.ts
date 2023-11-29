import {
  HydratedDocument,
  InferSchemaType,
  Model,
  Mongoose,
  ObtainSchemaGeneric,
  Schema,
} from 'mongoose'

declare global {
  var mongoose: {
    promise: ReturnType<Mongoose['connect']> | null
    conn: Mongoose | null
  }
}

export type MongoGenericModel<TSchema extends Schema = any> = Model<
  InferSchemaType<TSchema>,
  ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>,
  ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
  ObtainSchemaGeneric<TSchema, 'TVirtuals'>,
  HydratedDocument<
    InferSchemaType<TSchema>,
    ObtainSchemaGeneric<TSchema, 'TVirtuals'> &
      ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
    ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>
  >,
  TSchema
> &
  ObtainSchemaGeneric<TSchema, 'TStaticMethods'>
