import 'dotenv/config'
import { Queue, QueueEvents } from 'bullmq'
import { CONNECTION } from './constants'
import axios from 'axios'



async function main() {
  const isIO = process.argv.includes('io')
  const tasks = Array(3).fill(1e9)

  try {
    if (process.argv.includes('server')) {
      const instance = axios.create({ baseURL: 'http://localhost:3000' })

      if (isIO) {
        const t1 = performance.now()
        await Promise.all(tasks.map(() => instance.get(`/io-task/wait?delay=${process.argv.at(-1) || 1e3}`)))
        console.log(`${tasks.length} tasks are done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`)
      } else {
        const t1 = performance.now()
        await Promise.all(tasks.map(length => instance.get(`/cpu-task/${process.argv.includes('thread') ? 'thread' : 'queue'}/compute?length=${length}`))
        )
        console.log(`${tasks.length} tasks are done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`)
      }

    } else {
      const queueName = process.argv.includes('sandbox') ? 'sandboxed-queue' : 'queue'
      const q = new Queue(queueName, {
        connection: CONNECTION
      })
      const qe = new QueueEvents(queueName, { connection: CONNECTION })

      await q.waitUntilReady()
      await qe.waitUntilReady()

      const taskSuffix = isIO ? 'io-task' : 'cpu-task';

      const all = await Promise.all(
        tasks.map((length, index) => q.add(`${taskSuffix}-${index + 1}`, { length, delay: process.argv.at(-1) || 1e3 }))
      )

      const t1 = performance.now()
      await Promise.all(all.map(job => job.waitUntilFinished(qe)))

      console.log(`${tasks.length} tasks are done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`)
      await q.close()
      await qe.close()
    }
  } catch (error) {
    console.log(error)
  } finally {
    process.exit(0)
  }
}

main()
