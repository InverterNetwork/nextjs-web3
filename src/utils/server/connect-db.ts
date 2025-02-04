'use server'

// This File Can Not Contain use server or use client,
// it is meant to be consumed by next.js primitively
// parent folder can contain server or client code

import { connect, mongo } from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDb() {
  if (!MONGO_URI || typeof MONGO_URI !== 'string')
    throw new Error('Please add your MongoDB URI to .env')

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = connect(MONGO_URI!, {
      bufferCommands: false,
    })
      .then((mongoose) => {
        console.log('✅ New connection established')
        return mongoose
      })
      .catch((error) => {
        console.error('❌ Connection to database failed')
        throw error
      })
  }

  try {
    const conn = await cached.promise

    const bucket = new mongo.GridFSBucket(conn.connection.db!, {
      bucketName: 'images',
    })

    cached.conn = Object.assign(conn, { bucket })
  } catch (e) {
    console.error(e)
    cached.promise = null
    throw e
  }

  return cached.conn
}
