const express = require('express');
const { PrismaClient } = require('@prisma/client');
// const authenticateToken = require('../auth/authenticateToken');
const productsRouter = express.Router();
const prisma = new PrismaClient();

// Get all users
// Accessible to everyone
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        res.send(products);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Get user by ID
// Accessible to everyone
productsRouter.get('/:id', async (req, res, next) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await prisma.product.findUnique({
            where: { product_id: productId },
        });
        res.send(product);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Create a new user
// Accessible to everyone
productsRouter.post('/', async (req, res) => {
    console.log(req.body);
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
productsRouter.put('/:id', async (req, res, next) => {
    const productId = parseInt(req.params.id);
    try {
        const updatedProduct = await prisma.product.update({
            where: { product_id: productId },
            data: req.body,
        });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Delete a user
// restricted to authenticated users
productsRouter.delete('/:id', async (req, res, next) => {
    const productId = parseInt(req.params.id);
    try {
        await prisma.product.delete({
            where: { product_id: productId },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error.message);
        next(error)
    }
});

module.exports = productsRouter;