const router = require("express").Router();
const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

// Get all orders
router.get("/", async (req, res, next) => {
  try {
    const { rows: cartItems } = await prisma.order.findMany();
    res.send(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = router;