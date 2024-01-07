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
    console.log("File received:", req.file); // Log the file information

    const { title, description, price, category } = req.body;
    const image = req.file;

    // Form the URL for the uploaded image
    const imageUrl = image ? `https://cache-corner.onrender.com/uploads/${image.filename}` : null;

    console.log("Image URL:", imageUrl); // Log the formed URL

    try {
        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                image_url: imageUrl,
                is_available: true,
                user_id: req.user.user_id,
                category
            }
        });
        console.log("New product created:", newProduct); // Log the created product
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error creating product:", err); // Log any errors
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