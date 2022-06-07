const assert = require('assert')

// usado na maioria das vezes para listas de items únicos

const arr1 = [0, 1, 2]
const arr2 = [2, 0, 3]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), [0,0,1,2,2,3])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

assert.deepStrictEqual([...set], [0,1,2,3])

//Criando set com Spread/Rest operator
const set2 = new Set([...arr1, ...arr2])
assert.deepStrictEqual([...set2], [0,1,2,3])

// console.log(set.keys())
// console.log(set.values()) // Só existe por conta do Map

// no Array comum, para saber se existe um item
// [].indexOf(1) !== -1 ou [].includes(1)
assert.ok(set.has(3))

// Mesma teoria do Map, mas você sempre trabalha com a lista inteira
// Não tem get, então você precisa saber se o item está no array

//Tem nos dois arrays
const users1 = new Set([
  'aleshow',
  'joaozin',
  'fodaseman'
])

const users2 = new Set([
  'maloka da quebrada',
  'o clonador de cartão',
  'aleshow'
])

const intersection = new Set([...users1].filter(item => users2.has(item)))
assert.deepStrictEqual([...intersection], ['aleshow'])

const difference = new Set([...users1].filter(item => !users2.has(item)))
assert.deepStrictEqual([...difference], ['joaozin', 'fodaseman'])

// ----- WeakSet
// Mesma ideia do WeakMap
// Não é iterável
// Só trabalha com chaves como referência
// Só tem métodos simples

// const user = {id: 1}
// const user2 = {id: 2}
//
// const weakSet = new WeakSet([user])
// weakSet.add(user2)
// console.log(weakSet)
// console.log(weakSet.has(user2))
// console.log(weakSet.delete(user2))