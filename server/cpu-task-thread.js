import { workerData, parentPort } from 'worker_threads'

console.log("Started worker thread with data:", workerData, "PID:", process.pid);

let result = 0;

for (let i = 0; i < workerData.length; i++) {
  result = i;
}

console.log("Done worker thread with data:", workerData, "PID:", process.pid);

parentPort.postMessage(result.toString());
