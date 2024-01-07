const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../auth/authenticateToken');
const productsRouter = express.Router();
const prisma = new PrismaClient();
const multer = require('multer');
const upload = multer({ dest: '../uploads' });
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await prisma.product.findMany();
        console.log(products);
        res.send(products);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

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

productsRouter.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    const { title, description, price, category } = req.body;
    const image = req.file;

    try {
        const imageUrl = image ? `https://cache-corner.onrender.com/src/server/uploads/${image.filename}` : null;

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                image_url: imageUrl, // Use the formed URL
                is_available: true,
                user_id: req.user.user_id,
                category
            }
        });
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

productsRouter.put('/:id', authenticateToken, async (req, res, next) => {
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


productsRouter.delete('/:id', authenticateToken, async (req, res, next) => {
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