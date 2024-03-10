import { workerData, parentPort } from 'worker_threads'

console.log("Started worker thread with data:", { ...workerData, time: Date.now() }, "PID:", process.pid);

let result = 0;

for (let i = 0; i < workerData.length; i++) {
  result = i;
  console.log("Worker thread with data:", { ...workerData, time: Date.now() }, Date.now());
}

console.log("Done worker thread with data:", { ...workerData, time: Date.now() }, "PID:", process.pid);

parentPort.postMessage(result.toString());

