import { database } from "../shared/database.mjs";

class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  initialize(data) {
    this.table.render(data);
  }
}

(async () => {
  const path = globalThis.window ? "browser" : "console";
  const { default: ViewFactory } = await import(
    `../platforms/${path}/index.mjs`
  );
  const app = new Application(new ViewFactory());
  app.initialize(database);
})();
