const jsonServer = require("json-server");
const path = require("path");
const axios = require("axios");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"), {
  foreignKeySuffix: "_id",
});
const middlewares = jsonServer.defaults();
const paymentMiddleware = require("./middlewares/payment");

const isAuthorized = () => {
  return true;
};

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Access control
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    // add your authorization logic here
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});

// Add custom routes before JSON Server router
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.created_at = Date.now();
  }
  if (req.method === "PATCH" || req.method === "PUT" || req.method === "POST") {
    req.body.updated_at = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// server.use(paymentMiddleware)
server.use((req, res, next) => {
  if (req.method === "POST") {
    // add new payment
    req.body.remaining_amount = 0;
    req.body.is_complete = false;
  }
  next();
});

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log("JSON Server is running at port " + PORT);
});
