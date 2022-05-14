const crypto = require('crypto')

const { s } = require('./')

async function run() {
  const items = new Array(100000).fill(undefined)
  const randomBytes = await s(items, () => crypto.randomBytes(32).toString('hex'))
  return await s(randomBytes, (rdb) => crypto.createHash('sha256').update(Buffer.from(rdb, 'hex')).digest('hex'))
}

const start = Date.now()
run()
const end = Date.now()

console.log('Runtime: ' + (end - start) + ' ms')
