import chalk from "chalk";

// CPU intensive task
export const task = (taskName, length) => {
  console.log(chalk.bgYellow.bold("STARTED"), chalk.yellow(taskName), chalk.red(process.pid))

  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += i;
    // console.log(taskName, sum, i);
  }

  console.log(chalk.white.bgGreen.bold("DONE"), chalk.green(taskName), chalk.red(process.pid))
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// IO task
export const ioTask = async (taskName, delay) => {
  console.log(chalk.bgYellow.bold("STARTED"), chalk.yellow(taskName), chalk.red(process.pid))

  await wait(delay || 1e3);

  console.log(chalk.white.bgGreen.bold("DONE"), chalk.green(taskName), chalk.red(process.pid))
};

export default async (job) => {
  if (job.name.startsWith("io")) {
    return ioTask(job.name, job.data.delay)
  }

  return task(job.name, job.data.length)
}
