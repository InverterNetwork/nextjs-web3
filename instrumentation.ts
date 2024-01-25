import listen from '@/lib/listen'
import connectDB from '@/lib/utils/connectDB'

export async function register() {
  await connectDB()
  listen()
}
