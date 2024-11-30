/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { syncDatabase } from 'config/database'
import { userRouter } from './routes/user'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.use(userRouter)

const startServer = async () => {
  try {
    await syncDatabase()
    const PORT = process.env.APP_PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start the server:', error)
  }
}

startServer().catch(error => console.error('Error starting server:', error))

export { app }
