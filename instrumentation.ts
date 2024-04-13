import listen from '@/lib/listen'
import connectDB from '@/lib/utils/connectDB'

const MONGO_URI = process.env.MONGO_URI

export async function register() {
  if (!!MONGO_URI) {
    await connectDB()
    listen()
  } else {
    console.log(
      'MongoDB URI not found in .env file. Skipping database connection.'
    )
  }
}
