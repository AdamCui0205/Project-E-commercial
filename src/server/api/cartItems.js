const router = require("express").Router();
const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

// Get all cart items
router.get("/", async (req, res, next) => {
  try {
    const cartItems = await prisma.cartitem.findMany();
    console.log(cartItems);
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = router;