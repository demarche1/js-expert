const { deepStrictEqual, ok } = require("assert");
const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");

describe("API test suite", () => {
  describe("/contact", () => {
    it("Should request to contact route and return HTTP status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      deepStrictEqual(response.text, "Contact us page");
    });
  });

  describe("/hello", () => {
    it("Should request to an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);
      deepStrictEqual(response.text, "Hello World");
    });
  });

  describe("/login", () => {
    it("Should request to /login with wrong credentials and return HTTP status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "birobiro", password: "321" })
        .expect(401);

      ok(response.unauthorized);
      deepStrictEqual(response.text, "Login failed!");
    });

    it("Should request to /login and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "ale", password: "123" })
        .expect(200);

      ok(response.ok);
      deepStrictEqual(response.text, "Loggin succeed!");
    });
  });
});
