const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../auth/authenticateToken');
const router = express.Router();

// Get all orders
router.get('/', authenticateToken, async (req, res, next) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Get a single order by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
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
        console.error(error.message);
        next(error);
    }
});

// Create a new order
router.post('/', authenticateToken, async (req, res, next) => {
    const { user_id, total_amount, is_open } = req.body;
    try {
        const newOrder = await prisma.order.create({
            data: { user_id, total_amount, is_open },
        });
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Update an order
router.put('/:id', authenticateToken, async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { user_id, total_amount, is_open } = req.body;
    try {
        const updatedOrder = await prisma.order.update({
            where: { order_id: id },
            data: { user_id, total_amount, is_open },
        });
        res.json(updatedOrder);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Delete an order
router.delete('/:id', authenticateToken, async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.order.delete({
            where: { order_id: id },
        });
        res.json({ message: 'Order deleted' });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

module.exports = router;