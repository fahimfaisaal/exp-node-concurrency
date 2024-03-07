import 'dotenv/config'
import { Queue, QueueEvents } from 'bullmq'
import { CONNECTION } from './constants'

const queueName = process.argv[2] === 'sandbox' ? 'sandboxed-queue' : 'queue'

const q = new Queue(queueName, {
  connection: CONNECTION
})

const qe = new QueueEvents(queueName, { connection: CONNECTION })

q.waitUntilReady().then(async () => {
  const tasks = Array(6).fill(1e10)
  
  const all = await Promise.all(
    tasks.map((length, index) => q.add(`task-${index + 1}`, { length }))
  )

  const t1 = performance.now()
  await Promise.all(all.map(job => job.waitUntilFinished(qe)))

  console.log(`${tasks.length} tasks are done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`)
  process.exit(0)
})
