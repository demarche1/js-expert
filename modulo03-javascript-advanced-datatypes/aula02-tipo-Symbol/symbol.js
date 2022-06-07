const assert = require('assert')

// --keys
const uniqueKey = Symbol('userName')
const user = {}

user.userName = 'Value for normal Objects'
// Valor único em nível de memória
user[uniqueKey] = 'Value for Symbol'

// console.log(user.userName)
// console.log(user[uniqueKey])

assert.deepStrictEqual(user.userName, 'Value for normal Objects')
// Valor único em nível de memória
assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'Value for Symbol')

// É dificil de pegar, mas não é secreto!
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// bypass - má prática!!
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// Well known Symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['a', 'b', 'c', 'd'].reverse(),
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      }
    }
  })
}

// for (const item of obj) {
//   console.log(item)
// }

assert.deepStrictEqual([...obj], [ 'a', 'b', 'c', 'd' ])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  [Symbol.toPrimitive](typeCoercion) {
    if(typeCoercion !== 'string') throw new TypeError()

    const items = this[kItems]
      .map(item => {
        return new Intl.DateTimeFormat('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(item)
      })

    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  get [Symbol.toStringTag]() {
    return 'What???'
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(res => setTimeout(res, ms))

    for(const item of this[kItems]) {
      await timeout(500)

      yield item.toISOString()
    }
  }
}

const myDate = new MyDate(
  [2005, 02, 15],
  [2002, 11, 25]
)

const expectedDates = [
  new Date(2005, 02, 15),
  new Date(2002, 11, 25)
]

assert.deepStrictEqual(myDate[kItems], expectedDates)
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object What???]')
assert.throws(() => myDate + 1, TypeError)
// Coerção explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '15 de março de 2005 e 25 de dezembro de 2002')

// Implementar o iterator
assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
  const dates = []
  for await (const date of myDate) { dates.push(date) }

  const expectedDateISOString = expectedDates.map(date => date.toISOString())
  assert.deepStrictEqual(dates, expectedDateISOString)
})()

