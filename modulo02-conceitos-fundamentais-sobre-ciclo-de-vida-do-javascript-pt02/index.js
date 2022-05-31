'use strict'

const {watch} = require('fs'),
  {readFile} = require('fs/promises')

class File {
  async watch(event, filename) {
    console.log('arguments: ', Array.prototype.slice.call(arguments))
    console.log('this: ', this)
    await this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()
// Se não passar o bind, ele ignora o 'this' da classe File e herda o 'this' da função watch.
// Sempre que for delegar uma função para que outra função execute, sempre use o 'bind'.
// O 'bind' retorna uma função com o 'this' que foi 'setado', ignorando do watch.
watch(__filename, file.watch.bind(file))

// a diferença entre um e outro é que um os argumentos são passados em um array e no outro não.
file.watch.call({showContent: () => { console.log('call: Hey!!') }}, null, __filename)
file.watch.apply({showContent: () => { console.log('apply: Hey!!') }}, [null, __filename])