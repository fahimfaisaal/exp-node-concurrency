import { Worker, isMainThread, workerData, parentPort } from "node:worker_threads"

// running multiple threads in a single process 
async function main() {
  if (isMainThread) {
    const t1 = performance.now()
    await Promise.all(
      Array(6).fill(1e10).map(
        (item, index) =>
          new Promise((resolve, reject) => {
            const worker = new Worker(
              __filename,
              {
                workerData: {
                  length: item,
                  taskName: `task-${index + 1}`
                }
              }
            )

            worker.on('message', (data) => resolve(data));

            worker.on('error', (err) => reject(err));
          })
      )
    )

    return console.log(`Done in: ${((performance.now() - t1) / 1e3).toFixed(3)}s`)
  }

  console.log("Started worker thread with data:", { ...workerData, time: Date.now() }, "PID:", process.pid);

  let result = 0;

  for (let i = 0; i < workerData.length; i++) {
    result = i;
    // console.log("Worker thread with data:", { ...workerData, time: Date.now() }, Date.now());
  }

  console.log("Done worker thread with data:", { ...workerData, time: Date.now() }, "PID:", process.pid);

  parentPort.postMessage(result.toString());
}

main()
