const crypto = require('crypto')

function run() {
  const items = new Array(100000).fill(undefined)
  const randomBytes = items.map(item => crypto.randomBytes(32).toString('hex'))
  return randomBytes.map((rdb) => crypto.createHash('sha256').update(Buffer.from(rdb, 'hex')).digest('hex'))
}

const start = Date.now()
run()
const end = Date.now()

console.log('Runtime: ' + (end - start) + ' ms')
