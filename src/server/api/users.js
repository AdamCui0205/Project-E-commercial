const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../auth/authenticateToken');
const usersRouter = express.Router();
const prisma = new PrismaClient();

// Get all users
// Accessible to everyone
usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (error) {
        console.error(err.message);
        next(error)
    }
});

// Get user by ID
// Accessible to everyone
usersRouter.get('/:id', async (req, res, next) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: { user_id: userId },
        });
        res.send(user);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Create a new user
// Accessible to everyone
usersRouter.post('/', async (req, res, next) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body,
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Update a user
// restricted to authenticated users
usersRouter.put('/:id', authenticateToken, async (req, res, next) => {
    const userId = parseInt(req.params.id);
    try {
        const updatedUser = await prisma.user.update({
            where: { user_id: userId },
            data: req.body,
        });
        res.json(updatedUser);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
});

// Delete a user
// restricted to authenticated users
usersRouter.delete('/:id', authenticateToken, async (req, res, next) => {
    const userId = parseInt(req.params.id);
    try {
        await prisma.user.delete({
            where: { user_id: userId },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error.message)
        next(error);
    }
});

module.exports = usersRouter;

