import axios from 'axios';
import { pipeline } from 'stream/promises';
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


async function* output(stream) {
    for await(const data of stream) {
        console.log(data)
    }
}


async function* merge(streams) {
    for(const readable of streams) {
        // Faz trabalhar com objectMode
        readable.setEncoding('utf-8');

        for await(const chunk of readable) {
            for(const line of chunk.trim().split('/\n/')) {
                yield line
            }
        }
    }
}

await pipeline(
    merge(results),
    output
)