const Database = require("../utils/Database");
const UserService = require("../service/UserService");
const UserRepository = require("../repository/UserRepository");

class UserFactory {
  static async createIntance() {
    const db = new Database({
      connectionString: "mongodb://myconnection:8800",
    });

    const dbConnection = await db.connect();
    const userRepository = new UserRepository({ dbConnection });
    const userService = new UserService({ userRepository });

    return userService;
  }
}

module.exports = UserFactory;
