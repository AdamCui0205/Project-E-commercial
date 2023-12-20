const express = require("express");
const path = require("path");
const ViteExpress = require("vite-express");

const app = express();

app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.use("/cart", require("./api/cartItems.js"));
app.use("/orders", require("./api/orders.js"));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
