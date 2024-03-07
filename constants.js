import 'dotenv/config'

export const CONCURRENCY = 3;

export const CONNECTION = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS
}
