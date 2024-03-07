// CPU intensive task
export const task = (taskName, length) => {
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += i;
    // console.log(taskName, sum, i);
  }

  console.log("Task done:", taskName);
};

export default async (job) => {
  task(job.name, job.data.length);
}
