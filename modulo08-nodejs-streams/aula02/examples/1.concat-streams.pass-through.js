import axios from 'axios';
import { Writable,PassThrough } from 'stream';

const API_1_URL = 'http://localhost:3000';
const API_2_URL = 'http://localhost:4000';

const requests = await Promise.all([
    axios({
        method: 'GET',
        url: API_1_URL,
        responseType: 'stream'
    }),
    axios({
        method: 'GET',
        url: API_2_URL,
        responseType: 'stream'
    })
])

const results = requests.map(({ data }) => data);

const output = new Writable({
    write(chunk, encoding, callback) {
        const data = chunk.toString().replace(/\n/g, '');

        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
        console.log(`[${name.toLowerCase()}] ${data}`)
        callback();
    }
})

function merge(strams) {
    const passThrough = new PassThrough();
    strams.forEach(stream => stream.pipe(passThrough, { end: false }));
    return passThrough;
}

merge(results).pipe(output);