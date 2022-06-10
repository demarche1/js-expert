'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'

event.on(eventName, msg => console.log(msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set(target, p, value) {
    event.emit(eventName, `new value: ${value}, oldValue: ${target[p]}`)
    target[p] = value
    return true
  },

  get(target, p) {
    return target[p]
  }
})

setInterval(function () {
  proxy.counter++

  if(proxy.counter === 10) {
    clearInterval(this)
  }
}, 200)

// setTimeout com o valor do timer 0 tem ordem de execução maior do que o interval
setTimeout(() => {
  proxy.counter = 4
}, 200) // <-- se o valor do ms for 0 o callback do timeout vai ser executado antes do setInterval

setImmediate(() => {
  console.log(proxy.counter)
})

// Executa na hora! tem prioridade máxima, porem é uma má prática, acaba com o ciclo de vida do node.
process.nextTick(() => {
  proxy.counter = 8
})

// Ordem de execução
// [1] nextTick
// [2] setImmediate
// [3] setInterval
// [4] setTimeout
