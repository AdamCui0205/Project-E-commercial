const express = require("express");
const ViteExpress = require("vite-express");
const authenticateToken = require("./auth/authenticateToken");

const app = express();

// Public route
app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

// Protected route test.
app.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});


// ViteExpress config
ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
);