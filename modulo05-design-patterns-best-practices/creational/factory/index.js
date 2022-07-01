const UserFactory = require("./src/factory/UserFactory");

(async () => {
  const userFactory = await UserFactory.createIntance();
  const users = await userFactory.find({ name: "Alessandro" });

  console.log({ result: users });
})();
