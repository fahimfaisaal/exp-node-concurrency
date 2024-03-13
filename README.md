# Node Concurrency & Parallelism Experiment

## How to bootstrap

Install the project dependencies:

```bash
pnpm install
```

Start the Redis server (used by BullMQ) using Docker:

```bash
docker compose up -d
```

## Running the BullMQ Worker

To start the BullMQ worker, use the following command:

```bash
pnpm start:bull:worker
```

### Sends jobs to the worker

To send cpu intensive tasks

```bash
pnpm send
```

To send io tasks

```bash
pnpm send io
```

> Note: The io command accepts an optional delay argument (in milliseconds). The default delay is 1000ms.

## Running the BullMQ Sandbox Worker

The sandbox worker can utilize Node.js worker threads instead of multiple processes. To start it with threads argument, use:

```bash
pnpm start:bull:worker threads
```

### Sends jobs to the sandbox worker

To send cpu intensive tasks

```bash
pnpm send:sandbox
```

To send io tasks

```bash
pnpm send:sandbox io
```

## Starting the Server

```bash
pnpm start:server
```

### Using the Server API

The server API can be used to run I/O and CPU-intensive tasks.

For CPU intensive tasks

```bash
pnpm send server
```

For io tasks

```bash
pnpm send server io
```
