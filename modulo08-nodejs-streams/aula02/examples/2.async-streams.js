import { pipeline } from 'stream/promises'
import { setTimeout } from 'timers/promises'

async function* myCustomReadable() {
    yield Buffer.from('Hello 1')
    await setTimeout(1000)
    yield Buffer.from('World 2')
}

async function* myCustomTransform(stream) {
    for await (const chunk of stream) {
        yield chunk.toString().replace(/\s/g, "_")
    }
}

async function* myCustomWritable(stream) {
    for await (const chunk of stream) {
        console.log('[writable]', chunk)
    }
}

await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomWritable
)
