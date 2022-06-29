const { evaluateRegex } = require("../src/util");

class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    cpf,
    rua,
    numero,
    bairro,
    cidade,
  ]) {
    const capitalizeFirstLetter = (prop) => {
      return prop.replace(
        evaluateRegex(/^(\w{1})([a-z|A-Z]+$)/g),
        (fullMatch, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`;
        }
      );
    };

    this.nome = nome;
    this.nacionalidade = capitalizeFirstLetter(nacionalidade);
    this.estadoCivil = capitalizeFirstLetter(estadoCivil);
    this.cpf = cpf.replace(evaluateRegex(/\D/g), "");
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/g), "").join();
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/g), "").join();
    this.cidade = cidade.replace(evaluateRegex(/\./), "");
  }
}

module.exports = Person;
