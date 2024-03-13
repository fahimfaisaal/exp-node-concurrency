# Node Concurrency & Parallelism Experiment

## How to bootstrap

```bash
pnpm install
# and
docker compose up -d # to up the redis server for the bullmq
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
pnpm send io # every io send takes delay arg at last position of the command in ms. default 1000ms
```

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
