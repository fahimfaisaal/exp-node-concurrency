import { Worker } from "bullmq";
import path from "path";
import { CONNECTION, CONCURRENCY } from "../constants";

const sandboxProcess = path.join(__dirname, "sandbox-task.js")

const worker = new Worker("sandboxed-queue", sandboxProcess, {
  connection: CONNECTION,
  autorun: false,
  concurrency: CONCURRENCY,
})

worker.waitUntilReady().then(() => {
  console.log("Sandboxed Worker is ready")
  worker.run()
})




