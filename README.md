# prsms

2 utility functions that wrap an array of items and a (a/s)ynchronous call into Promise.all() for concurrency.

The synchronous callback version can be used to avoid blocking the thread with long calls to synchronous functions.

```ts
const crypto = require('crypto')
const { s } = require('prsms')

const items = new Array(1000).fill(undefined)

const randomHashes =
  s(items, () => crypto.randomBytes(32))
  .then(rdbs => s(rdbs, (rdb) => crypto.createHash('sha256').update(rdb).digest('hex')))

// do other stuff on the thread
```

It's the non-blocking equivalent to:

```ts
const crypto = require('crypto')
const { s } = require('prsms')

const items = new Array(1000).fill(undefined)

const randomBytes = await s(items, () => crypto.randomBytes(32))
const hashes = await s(randomBytes, (rdb) => crypto.createHash('sha256').update(rdb).digest('hex'))

// do other stuff after everything is done
```

Which is about as fast as the fully synchronous version

```ts
const crypto = require('crypto')

const items = new Array(1000).fill(undefined)

const randomBytes = items.map(item => crypto.randomBytes(32))

const hashes = randomBytes.map((rdb) => crypto.createHash('sha256').update(rdb).digest('hex'))
```

And the asynchronous version is mostly made to simplify calls to `Promise.all()`:

```ts
await Promise.all(x.map(async (y) => something(y)))
```

Becomes

```ts
const { a } = require('prsms')

await a(x, async (y) => something(y))
```

It's not lodash but I use it!

And it's type-safe :O
