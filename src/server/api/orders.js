const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const order = await prisma.order.findUnique({
            where: { order_id: id },
        });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    const { user_id, total_amount, is_open } = req.body;
    try {
        const newOrder = await prisma.order.create({
            data: { user_id, total_amount, is_open },
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an order
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { user_id, total_amount, is_open } = req.body;
    try {
        const updatedOrder = await prisma.order.update({
            where: { order_id: id },
            data: { user_id, total_amount, is_open },
        });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.order.delete({
            where: { order_id: id },
        });
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;