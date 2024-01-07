const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require('../auth/authenticateToken');

const router = express.Router();

// Get all of the user's cart items
router.get('/', authenticateToken, async (req, res, next) => {
    const user_id = req.user.user_id; // Extract user_id from the authenticated user
    console.log("logged in as user", req.user)
    console.log(`retrieving cart for user with id: ${user_id}`)
    console.log(`token passed to endpoint is: ${req.header['authorization']}`)

    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { user_id: user_id },
            include: { product: true } // Includes related product details
        });
        res.json(cartItems);
    } catch (error) {
        console.error(error.message);
        next(error);
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
    const { product_id, quantity } = req.body;
    const user_id = req.user.user_id;

    try {
        // Check if the product already exists in the cart
        const existingItem = await prisma.cartItem.findFirst({
            where: { product_id, order_id: null, user_id }
        });

        if (existingItem) {
            // If the product exists in the cart, update the quantity
            const updatedCartItem = await prisma.cartItem.update({
                where: { cart_item_id: existingItem.cart_item_id },
                data: { quantity: existingItem.quantity + quantity }, // todo: Make sure front-end takes quantity into account
                include: {product: true}, //include related product details in the response
            });
            res.status(200).json(updatedCartItem);
        } else {
            // If not, create a new cart item
            const newCartItem = await prisma.cartItem.create({
                data: { product_id, quantity, user_id },
                include: { product:true }, //include related product details in the response
            });
            res.status(201).json(newCartItem);
        }
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// PUT route to update the quantity of a cart item
router.put('/:id', authenticateToken, async (req, res, next) => {
    const cart_item_id = parseInt(req.params.id);
    const { quantity } = req.body;
    const user_id = req.user.user_id;

    try {
        const updatedCartItem = await prisma.cartItem.updateMany({
            where: { cart_item_id, user_id, order_id: null }, // Checks to make sure itmes are not checked out
            data: { quantity },
            include: { product: true }, //include related product details in response
        });

        // If the cart item does not exist or does not belong to the user, return 404
        if (updatedCartItem.count === 0) {
            return res.status(404).json({ message: 'Item not found or does not belong to user' });
        }

        //Fetch the updated cart items after the update
        const updatedCart = await prisma.cartItem.findMany({
            where: { user_id, order_id:null },
            include: { product: true },
        });
        // If the cart item exists, return the updated cart item
        res.json(updatedCart);
        res.json(updatedCartItem);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

/// DELETE route to remove an item from the cart
router.delete('/:id', authenticateToken, async (req, res, next) => {
    const cart_item_id = parseInt(req.params.id);
    const user_id = req.user.user_id;

    try {
        await prisma.cartItem.deleteMany({
            where: { cart_item_id, user_id, order_id: null },
        });
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

module.exports = router;
