const router = require("express").Router();
const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

// Get all cart items
router.get("/", async (req, res, next) => {
  try {
    const { rows: cartItems } = await prisma.cartItem.findMany();
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = router;