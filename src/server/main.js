const express = require("express");
const ViteExpress = require("vite-express");
const authenticateToken = require("./auth/authenticateToken");
const path = require("path");

const app = express();

// Public route
app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

// Protected route test.
app.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

app.use("/cart", require("./api/cartItems.js"));
app.use("/orders", require("./api/orders.js"));
app.use("/products", require("./api/products.js"));
app.use("/users", require("./api/users.js"));

app.use(express.static(path.join(__dirname, "..", "client/dist")));

// ViteExpress config
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
