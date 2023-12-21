const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../auth/authenticateToken');
const productsRouter = express.Router();
const prisma = new PrismaClient();

// Get all users
// Accessible to everyone
productsRouter.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get user by ID
// Accessible to everyone
productsRouter.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });
        res.send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new user
// Accessible to everyone
productsRouter.post('/', async (req, res) => {
    try {
        const newProduct = await prisma.product.create({
            data: req.body,
        });
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a user
// restricted to authenticated users
productsRouter.put('/:id', authenticateToken, async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: req.body,
        });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a user
// restricted to authenticated users
productsRouter.delete('/:id', authenticateToken, async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        await prisma.product.delete({
            where: { id: productId },
        });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = productsRouter;