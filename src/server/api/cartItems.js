const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../auth/authenticateToken');

const router = express.Router();

// Get all cart items
router.get('/', authenticateToken, async (req, res, next) => {
    try {
        const cartItems = await prisma.cartItem.findMany();
        res.json(cartItems);
    } catch (error) {
       console.error(error.message);
        next(error); // Pass errors to Express. Sends it to the next router to try to handle it.
    }
});

// Get a single cart item by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const cartItem = await prisma.cartItem.findUnique({
            where: { cart_item_id: id },
        });
        if (cartItem) {
            res.status(200).json({ message: 'Item found', cartItem });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
      console.error(error.message);
      next(error);
    }
});

// Create a new cart item
router.post('/', authenticateToken, async (req, res, next) => {
    const { product_id, order_id, price, quantity } = req.body;
    console.log(req.body);
    try {
        const newCartItem = await prisma.cartItem.create({
            data: { product_id, order_id, price, quantity },
        });
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error(error.message);
        next(error)
    }
});

// Update a cart item
router.put('/:id', authenticateToken, async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { product_id, order_id, price, quantity } = req.body;
    try {
        const updatedCartItem = await prisma.cartItem.update({
            where: { cart_item_id: id },
            data: { product_id, order_id, price, quantity },
        });
        res.json(updatedCartItem); // add status code
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Delete a cart item
router.delete('/:id', authenticateToken, async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.cartItem.delete({
            where: { cart_item_id: id },
        });
        res.json({ message: 'Item deleted' }); // send status code with item deleted
    } catch (error) {
        console.error   (error.message);
        next(error);
    }
});

module.exports = router;
