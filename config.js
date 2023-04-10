import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'
const envFilePath = `.env.${env}`

dotenv.config({ path: envFilePath })

export default {
  apiKey: process.env.ApiKey,
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 5000,
  user: process.env.user,
  pass: process.env.pass,
  TO: process.env.TO,
  jwtKey: process.env.JWT_SECRET_KEY,
  scheduleTime: process.env.scheduleTime,
  patternTime: process.env.patternTime,
};