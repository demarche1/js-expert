

import { Readable, Writable } from 'stream';

// readable é sempre a entrada dos dados
const readable = new Readable({
    read() {
        this.push('Hello World 1');
        this.push('Hello World 2');
        this.push('Hello World 3');
        this.push('Hello World 4');

        this.push(null)
    }
})


// writable é sempre a saida dos dados.
const writable = new Writable({
    write(chunk, encoding, cb) {
        console.log('Output:', chunk.toString());

        cb()
    }
})

readable.pipe(writable)