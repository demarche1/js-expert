const assert = require('assert')
const myMap = new Map()

//Map pode ter qualquer coisa como chave
myMap
  .set(1, 'Number')
  .set('foo', {bar: 'bar'})
  .set(true, () => 'Hello World')

//Utilizando map com contructor
const mapWithContructor = new Map([
  ['1', 'primeiro'],
  [2, {segundo: 2}]
])

assert.deepStrictEqual(myMap.get(1), 'Number')
assert.deepStrictEqual(myMap.get(true)(), 'Hello World')
assert.deepStrictEqual(mapWithContructor.get(2), {segundo: 2})

//Em Objects as chaves só podem ser Strings ou Symbol(se passar Number no final ele é coergido pra string)
const onlyReferenceWorks = {id: 1}
myMap.set(onlyReferenceWorks, {name: 'Aleshow'})

assert.deepStrictEqual(myMap.get(onlyReferenceWorks), {name: 'Aleshow'})
assert.deepStrictEqual(myMap.get({id: 1}), undefined)

//Utilitários do Map
// - No Object para ver o tamanho do objeto = Object.keys({id: 1}).length
assert.deepStrictEqual(myMap.size, 4)

//Para verificar se existe uma chave no objeto
// item.key se não tiver retorna undefined
// if(item.key) ... = o if faz a coerção implicita para boolean
// Ou ({name: 'Aleshow'}).hasOwnProperty('name')
assert.ok(myMap.has('foo'))
assert.ok(myMap.has(onlyReferenceWorks))

// Para remover um item do objeto
// delete item.key
// imperformático no JavaScript
assert.ok(myMap.delete(onlyReferenceWorks))

// no objeto não da pra iterar diretamente
// teria que usar o for in e pegar as chaves através do indice
// ou usar o Object.entries()
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"Number"],["foo",{"bar":"bar"}],[true,() => {}]]))

// for (const [key, value] of myMap) {
//   console.log('key ->', key, '| value ->', value)
// }

// Object é inseguro pois dependendo do nome da chave, pode substituir o comportamento padrão da estrutura
// ({}).toString() === [object Object]
// ({toString: () => 'Hey'}).toString() === "Hey"
// Qualquer chave pode colidir, com as propriedades herdadas do objeto, como contructor, toString, valueOf e etc...

const actor = {
  name: 'Johnny Depp',
  toString: () => 'Hey John'
}
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// no Object não tem como limpar sem reassina-lo
myMap.clear()
assert.deepStrictEqual(myMap.size, 0)
assert.deepStrictEqual([...myMap.keys()], [])

// Quando usar o Map na prática

// 1 - Precisa adicionar chaves com frequência
// 2 - Precisa validar se a chave existe com semântica
// 3 - Precisa que o Objeto funcione como um banco de dados (aonde a chave é um object e tem um conjuto de dados)
// 4 - Quando precisar limpar o Objeto apos o uso, ex: quando um usuário clica em um botão reset e vc quer limpar todos os objetos em uso

// -------- WeakMap

// Pode ser coletado após perder as referências, usado em casos bem específicos
// Tem a maioria dos beneficios do Map MAS não é iterável, e as chaves só ser acessada por referência
// Mais leve e prevê leak de memória, depois que o garbage collector do javascript passa limpando as referências, tudo é limpo do WeakMap

const weakMap = new WeakMap()
const hero = {name: 'Flash'}
console.log(weakMap.set(hero))
console.log(weakMap.get(hero))
console.log(weakMap.has(hero))
console.log(weakMap.delete(hero))
