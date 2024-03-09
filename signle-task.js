import { task } from "./workers/task";

const t1 = performance.now();
task("task", 1e10);
console.log("Task done in:", ((performance.now() - t1) / 1e3).toFixed(3), "s");
