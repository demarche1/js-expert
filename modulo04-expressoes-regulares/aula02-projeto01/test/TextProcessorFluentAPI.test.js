const { expect, assert } = require("chai");
const { describe, it } = require("mocha");
const TextProcessorFluentAPI = require("../src/TextProcessorFluentAPI");
const mock = require("./mock/valid");

describe("TextProcessorFluentAPI", () => {
  it("#Build", () => {
    const result = new TextProcessorFluentAPI(mock).build();

    expect(result).to.deep.equal(mock);
  });

  it("#extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build();

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

    expect(result).to.deep.equal(expected);
  });

  it("#divideTextInColumns", () => {
    const mock = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
    ];

    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];

    const result = new TextProcessorFluentAPI(mock)
      .divideTextInColumns()
      .build();

    expect(result).to.deep.equal(expected);
  });

  it("#removeUnecessarySpaces", () => {
    const mock = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];

    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentAPI(mock)
      .removeUnecessarySpaces()
      .build();

    expect(result).to.deep.equal(expected);
  });

  it("#mapPerson", () => {
    const mock = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentAPI(mock).mapPerson().build();

    const expected = [
      {
        nome: "Xuxa da Silva",
        nacionalidade: "Brasileira",
        estadoCivil: "Casada",
        cpf: "23574342012",
        rua: "Rua dos bobos",
        numero: "zero",
        bairro: "Alphaville",
        cidade: "São Paulo",
      },
    ];

    expect(result).to.be.deep.equal(expected);
  });
});
