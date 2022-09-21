

import { Readable, Writable, Transform } from 'stream';
import { writeFileSync } from 'fs'

// readable é sempre a entrada dos dados
const readable = new Readable({
    read() {
        for(let i = 0; i < 1e6; i++) {
            const person = {
                id: `${Date.now()}${i}`,
                name: `Ale-${i}`
            }

            this.push(JSON.stringify(person))
        }

        this.push(null)
    }
})

const transformMap = new Transform({
    transform(chunk, encoding, cb) {
        const data = JSON.parse(chunk)

        const result = `${data.id}, ${data.name.toUpperCase()}`

        cb(null, result)
    }
})


// writable é sempre a saida dos dados.
const writable = new Writable({
    write(chunk, encoding, cb) {
        writeFileSync('output.txt', chunk.toString(), {
            flag: 'a'
        })
        cb()
    }
})

readable
    .pipe(transformMap)
    .pipe(writable)