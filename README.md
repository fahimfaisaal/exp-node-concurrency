# exp-node-concurrency

## How to bootstrap

```bash
pnpm install
# and
docker compose up -d # to up the redis server for the bullmq
```

## Run bullmq worker

To run bullmq worker just run

```bash
pnpm start:bull:worker
```

### Sends jobs to worker

To send cpu intensive tasks

```bash
pnpm send
```

To send io tasks

```bash
pnpm send io # every io send takes delay arg at last position of the command in ms. default 1000ms
```

## Run bullmq sandbox worker

even it takes arg `threads` to run in node js worker thread instead multiple process

```bash
pnpm start:bull:worker threads
```

### Sends jobs to sandbox worker

To send cpu intensive tasks

```bash
pnpm send:sandbox
```

To send io tasks

```bash
pnpm send:sandbox io
```

## Run the server

```bash
pnpm start:server
```

### Call server api for running io and cpu intensive task

For CPU intensive tasks

```bash
pnpm send server
```

For io tasks

```bash
pnpm send server io
```
