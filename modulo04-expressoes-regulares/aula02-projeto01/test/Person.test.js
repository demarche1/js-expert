const { expect } = require("chai");
const { describe, it } = require("mocha");
const Person = require("../src/Person");

describe("Person", () => {
  it("Should return a Person instance", () => {
    const mock = [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo.",
    ];

    const expected = {
      nome: "Xuxa da Silva",
      nacionalidade: "Brasileira",
      estadoCivil: "Casada",
      cpf: "23574342012",
      rua: "Rua dos bobos",
      numero: "zero",
      bairro: "Alphaville",
      cidade: "São Paulo",
    };

    const result = new Person(mock);

    expect(result).to.be.deep.equal(expected);
  });
});
