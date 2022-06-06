const {deepStrictEqual} = require('assert')

let value = 0
let value2 = value // => Vai para o Call Stack
value2++
// Tipos primitivos gera cópia em memória
deepStrictEqual(value, 0)
deepStrictEqual(value2, 1)

// Tipos de referência, copia o endereço de memória
// e aponta para o mesmo lugar
let obj = {value: 0}
let obj2 = obj // => Armazena o valor de referência no Memory Heap

obj.value++
deepStrictEqual(obj, {value: 1})
obj2.value++
deepStrictEqual(obj, {value: 2})
