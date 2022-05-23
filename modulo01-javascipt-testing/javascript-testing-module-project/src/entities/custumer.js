const Base = require("./base/base");

class Custumer extends Base {
  constructor({ id, name, age }) {
    super({ id, name });

    this.age = age;
  }
}

module.exports = Custumer;
