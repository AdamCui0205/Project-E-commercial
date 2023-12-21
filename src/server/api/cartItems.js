const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Get all cart items
router.get('/', async (req, res) => {
    try {
        const cartItems = await prisma.cartItem.findMany();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single cart item by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cartItem = await prisma.cartItem.findUnique({
            where: { cart_item_id: id },
        });
        if (cartItem) {
            res.json(cartItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new cart item
router.post('/', async (req, res) => {
    const { product_id, order_id, price, quantity } = req.body;
    console.log(req.body);
    try {
        const newCartItem = await prisma.cartItem.create({
            data: { product_id, order_id, price, quantity },
        });
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a cart item
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { product_id, order_id, price, quantity } = req.body;
    try {
        const updatedCartItem = await prisma.cartItem.update({
            where: { cart_item_id: id },
            data: { product_id, order_id, price, quantity },
        });
        res.json(updatedCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a cart item
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.cartItem.delete({
            where: { cart_item_id: id },
        });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
