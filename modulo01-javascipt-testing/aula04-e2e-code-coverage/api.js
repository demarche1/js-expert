const { createServer } = require("http");
const DEFULT_USER = { username: "ale", password: "123" };

const routes = {
  "/contact:get": (req, res) => {
    res.write("Contact us page");
    return res.end();
  },

  "/login:post": async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data);
      if (
        user.username !== DEFULT_USER.username ||
        user.password !== DEFULT_USER.password
      ) {
        res.writeHead(401);
        res.write("Login failed!");
        return res.end();
      }

      res.write("Loggin succeed!");
      return res.end();
    }
  },

  default: (req, res) => {
    res.write("Hello World");
    return res.end();
  },
};

function handler(req, res) {
  const { url, method } = req;
  const pattern = `${url}:${method.toLowerCase()}`;
  const chosen = routes[pattern] || routes.default;
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  return chosen(req, res);
}

const app = createServer(handler).listen(3000, () => {
  console.log("server is running on port", 3000);
});

module.exports = app;
