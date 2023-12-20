const router = require("express").Router();
const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

// Get all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;