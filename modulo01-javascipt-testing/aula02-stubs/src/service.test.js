const Service = require("./service");
const { deepStrictEqual } = require("assert");
const sinon = require("sinon");
const BASE_URL1 = "https://swapi.dev/api/people/1";
const BASE_URL2 = "https://swapi.dev/api/people/2";
const mocks = {
  luke: require("./mocks/luke.json"),
  c3po: require("./mocks/c3po.json"),
};

(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL1).resolves(mocks.luke);
  stub.withArgs(BASE_URL2).resolves(mocks.c3po);

  {
    const expected = {
      name: "Luke Skywalker",
      birthYear: "19BBY",
      appearedIn: 4,
    };

    const result = await service.getCharacterInfo(BASE_URL1);
    deepStrictEqual(result, expected);
  }

  {
    const expected = {
      name: "C-3PO",
      birthYear: "112BBY",
      appearedIn: 6,
    };

    const result = await service.getCharacterInfo(BASE_URL2);
    deepStrictEqual(result, expected);
  }
})();
