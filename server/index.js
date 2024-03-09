import express from "express";
import { setTimeout } from 'timers/promises';
import { CONNECTION } from '../constants'
import { Queue, QueueEvents } from 'bullmq'
const app = express();

app.use(express.json());

const q = new Queue('sandboxed-queue', {
  connection: CONNECTION
})
const qe = new QueueEvents('sandboxed-queue', { connection: CONNECTION })

const processWithWorkerThread = (fileName, data) => {
  const { Worker } = require('worker_threads');

  return new Promise((resolve, reject) => {
    const worker = new Worker(fileName, { workerData: data });
    worker.on('message', (data) => resolve(data));

    worker.on('error', (err) => reject(err));
  })
}

app.get("/health", (_, res) => {
  res.send("Server is running on port 3000, PID: " + process.pid);
})

app.get("/kill", (_, res) => {
  res.send("Server is shutting down");
  process.exit(0);
})

app.get("/io-task/wait", async (req, res) => {
  const { delay } = req.query;
  const t1 = performance.now()
  console.log("Started IO task with delay:", delay, "PID:", process.pid);

  await setTimeout(delay);

  console.log("Done IO task with delay:", delay, "PID:", process.pid);

  res.send(`Done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`);
})

app.get("/cpu-task/thread/compute", (req, res) => {
  const { length } = req.query;
  const t1 = performance.now()

  processWithWorkerThread(__dirname + '/cpu-task-thread.js', { length })
    .then(() => res.send(`Done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`))
    .catch(err => res.send(err.toString()));
})

app.get("/cpu-task/queue/compute", async (req, res) => {
  const { length } = req.query;
  const t1 = performance.now()
  console.log('Start queue cpu sandboxed task', { length })

  try {
    const job = await q.add('server-cpu-task', { length }, { removeOnComplete: true })
    console.log('Job added to queue. Job id:', job.id)
    await job.waitUntilFinished(qe)
    res.send(`Done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`)
  } catch (err) {
    res.send(err.toString())
  }
})

app.listen(3000, async () => {
  await q.waitUntilReady()
  await qe.waitUntilReady()
  console.log("Server is running on port 3000, PID:", process.pid)
})
