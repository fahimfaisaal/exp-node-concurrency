import 'dotenv/config'
import { Queue, QueueEvents } from 'bullmq'
import { CONNECTION } from './constants'

const queueName = process.argv.includes('sandbox') ? 'sandboxed-queue' : 'queue'

const q = new Queue(queueName, {
  connection: CONNECTION
})

const qe = new QueueEvents(queueName, { connection: CONNECTION })

const taskSuffix = process.argv.includes('io') ? 'io-task' : 'cpu-task';

q.waitUntilReady().then(async () => {
  const tasks = Array(6).fill(1e10)
  
  const all = await Promise.all(
    tasks.map((length, index) => q.add(`${taskSuffix}-${index + 1}`, { length }))
  )

  const t1 = performance.now()
  await Promise.all(all.map(job => job.waitUntilFinished(qe)))

  console.log(`${tasks.length} tasks are done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`)
  process.exit(0)
})
