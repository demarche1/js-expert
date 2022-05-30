9999999999999999 // 16
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'
'21' - true
// 20
'21' - - 1
// 22
0.1 + 0.2 === 0.3
// false

3 > 2 > 1
// false
3 > 2 >= 1
// true

"B" + "a" + + "a" + "a"
// BaNaNa

'1' == 1
'1' === 1

// --------------

const person = {
  name: 'Alessandro',
  age: 26,
  // string: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name} Age: ${this.age}`
  },
  // number: 1 se nao for primitivo, chama o toString
  valueOf() {
    return 0o07
  },
  // ele tem prioridade na parada!
  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    }

    return types[coercionType] || types.string
  }
}

// console.assert(person + 0 === 7)

// console.assert('a'.concat(person) === 'a{"name":"Alessandro","age":26}')
// console.assert(String(person) === '{"name":"Alessandro","age":26}')
const person2 = {...person, name: 'Zézin', age: 30}
console.assert(person2.name === 'Zézin' && person2.age === 30)


