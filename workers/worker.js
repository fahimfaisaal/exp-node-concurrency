import { Worker } from "bullmq";
import processor from "./task";
import { CONNECTION, CONCURRENCY as concurrency} from "../constants";

const worker = new Worker("queue", processor, {
  connection: CONNECTION,
  autorun: false,
  concurrency,
  useWorkerThreads: true
})

worker.waitUntilReady().then(() => {
  console.log("Worker is ready, on PID:", process.pid, "concurrency:", concurrency)

  worker.run()
})



