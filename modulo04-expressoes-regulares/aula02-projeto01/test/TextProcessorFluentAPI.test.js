const { expect } = require("chai");
const { describe, it } = require("mocha");
const TextProcessorFluentAPI = require("../src/TextProcessorFluentAPI");
const mock = require("./mock/valid");

describe("TextProcessorFluentAPI", () => {
  it("#Build", () => {
    const result = new TextProcessorFluentAPI(mock).build();

    expect(result).to.be.a("string");
    expect(result).to.have.lengthOf(mock.length);
    expect(result).to.deep.equal(mock);
  });

  it("#extractPeapleData", () => {
    const result = new TextProcessorFluentAPI(mock).extractPeapleData().build();

    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(result).to.be.a("array");
    expect(result).to.have.lengthOf(expected.length);
    expect(result).to.deep.equal(expected);
  });
});
