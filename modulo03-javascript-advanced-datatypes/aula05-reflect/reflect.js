const assert = require('assert')

// Reflect server para garantir semântica e segurança nos objetos

const obj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}


// -- apply
assert.deepStrictEqual(obj.add.apply({arg1: 10, arg2: 20}, [100]), 130)

// Um problema de segurança(raro)
// Function.prototype.apply = () => { throw TypeError('Hey') }
// Pode aconcer
obj.add.apply = () => { throw TypeError('Ya') }
assert.throws(() => { obj.add.apply({}, []) }, TypeError)

// Reflect
const result = Reflect.apply(obj.add, {arg1: 50, arg2: 20}, [100])
// Repara que a linha 18 está modificando o método apply
assert.deepStrictEqual(result, 170)

// defineProperty
function MyDate() {}

// Feio, não é semântico, tudo é Object no JS mas Object adicionando propriedade em Function?
Object.defineProperty(MyDate, 'myProperty', { value: () => 'hi' })

// Assim faz mais sentido
Reflect.defineProperty(MyDate, 'myProperty2', { value: () => 'hi from Reflect' })

assert.deepStrictEqual(MyDate.myProperty(), 'hi')
assert.deepStrictEqual(MyDate.myProperty2(), 'hi from Reflect')

// deleteProperty
const withDelete = {name: 'Aleshow'}
delete withDelete.name
// usar o delete é imperfomático no JS, evitar o máximo!!
assert.deepStrictEqual(withDelete.hasOwnProperty('name'), false)

const withDeleteProperty = {name: 'Aleshow'}
Reflect.deleteProperty(withDeleteProperty, 'name')

assert.deepStrictEqual(withDeleteProperty.hasOwnProperty('name'), false)

// get

// Deveriamos fazer get somente em instâncias de referências
assert.deepStrictEqual(1['userName'], undefined)

// Usando reflaction uma exceção é lançada
assert.throws(() => {Reflect.get(1, "userName")}, TypeError)

// has
assert.ok('superman' in {superman: ''})
assert.ok(Reflect.has({batman: ''}, 'batman'))

// ownKeys

// Com os métodos do Object temos que fazer 2 requisições
const name = Symbol('name')
const databaseUser = {
  id: '1',
  [name]: 'Aleshow',
  [Symbol.for('password')]: 123
}
const databaseUserKeysNames = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]
assert.deepStrictEqual(databaseUserKeysNames, ['id', name, Symbol.for('password')])

// Com Reflect
const databaseUserKeysNamesReflect = [
  ...Reflect.ownKeys(databaseUser)
]
assert.deepStrictEqual(databaseUserKeysNamesReflect, ['id', name, Symbol.for('password')])
