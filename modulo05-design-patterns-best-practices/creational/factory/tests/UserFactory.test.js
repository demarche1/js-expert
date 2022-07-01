const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");

const dataMock = [
  {
    name: "Zezin",
  },
  {
    name: "Joaozin",
  },
];

class MockDatabase {
  async connect() {
    return this;
  }

  async find() {
    return dataMock;
  }
}

rewiremock(() => require("../src/utils/Database")).with(MockDatabase);

(async () => {
  {
    const expected = [
      {
        name: "ZEZIN",
      },
      {
        name: "JOAOZIN",
      },
    ];

    rewiremock.enable();
    const UserFactory = require("../src/factory/UserFactory");
    const userFactory = await UserFactory.createIntance();
    const result = await userFactory.find();

    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
})();
