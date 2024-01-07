const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../auth/authenticateToken');
const cloudinary = require('cloudinary').v2;
const productsRouter = express.Router();
const prisma = new PrismaClient();
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

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../auth/authenticateToken');
const cloudinary = require('cloudinary').v2;
const productsRouter = express.Router();
const prisma = new PrismaClient();

productsRouter.post('/', authenticateToken, async (req, res) => {
    const { title, description, price, category } = req.body;
    const imageFile = req.files?.image;

    try {
        let imageUrl = '';
        if (imageFile) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
                resource_type: 'auto'
            });
            imageUrl = result.url; // URL returned from Cloudinary
        }

        // Create a new product with the image URL from Cloudinary
        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                image_url: imageUrl, // Use the Cloudinary URL
                is_available: true,
                user_id: req.user.user_id, // Set by authenticateToken middleware
                category
            }
        });

        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).send(err.message);
    }
});

module.exports = productsRouter;



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