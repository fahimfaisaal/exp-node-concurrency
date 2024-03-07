import { Worker } from "bullmq";
import { task } from "./sandbox-task";
import { CONNECTION, CONCURRENCY as concurrency} from "../constants";

const worker = new Worker("queue", (job) => task(job.name, job.data.length), {
  connection: CONNECTION,
  autorun: false,
  concurrency,
})

worker.waitUntilReady().then(() => {
  console.log("Worker is ready")
  worker.run()
})



