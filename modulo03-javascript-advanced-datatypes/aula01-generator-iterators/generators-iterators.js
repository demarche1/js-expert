const assert = require('assert')

function* mult(a, b) {
  yield a * b
}

function* main() {
  yield 'Hello'
  yield '-'
  yield 'World'
  yield* mult(10, 20)
}

const generator = main()

// assert.deepStrictEqual(generator.next(), {value: 'Hello', done: false})
// assert.deepStrictEqual(generator.next(), {value: '-', done: false})
// assert.deepStrictEqual(generator.next(), {value: 'World', done: false})
// assert.deepStrictEqual(generator.next(), {value: 200, done: false})
// assert.deepStrictEqual(generator.next(), {value: undefined, done: true})

// assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200])
// assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200])

// -- Async iterators

const {readFile, stat, readdir} = require('fs/promises')

function* promisified() {
  yield readFile(__filename)
  yield new Promise(resolve => resolve('Hey Dude'))
}

// What's the difference between that two promisified functions????

// function promisified() {
//   return [readFile(__filename), new Promise(resolve => resolve('Hey Dude'))]
// }

// Promise.all([...promisified()]).then(result => console.log(result))

async function* systemInfo() {
  const file = await readFile(__filename)
  yield {file: file.toString()}

  const {size} = await stat(__filename)
  yield {size}

  const dir =  await readdir(__dirname)
  yield {dir}
}

;(async () => {
  for await(const item of systemInfo()) {
    console.log(item)
  }
})()

