module.exports = class ContextStrategy {
  constructor(dbStrategy) {
    this.dbStrategy = dbStrategy;
  }

  async connect() {
    return await this.dbStrategy.connect();
  }

  async create(item) {
    return await this.dbStrategy.create(item);
  }

  async read(item) {
    return await this.dbStrategy.read(item);
  }
}