class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async find(query) {
    await this.sleep(100);
    return [
      {
        name: "Alessandro",
      },
    ];
  }

  async connect() {
    await this.sleep(100);
    return this;
  }
}

module.exports = Database;
