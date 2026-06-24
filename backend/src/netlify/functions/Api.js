import serverless from 'serverless-http'
import mongoose from 'mongoose'
import app from '../../App.js'
import connectdb from '../../src/config/db.js'

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return // already connected, reuse
  await connectdb()
}

const serverlessHandler = serverless(app, {
  basePath: '/.netlify/functions/api'
})

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  await connectToDatabase()
  return serverlessHandler(event, context)
}