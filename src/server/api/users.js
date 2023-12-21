const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../auth/authenticateToken');
const usersRouter = express.Router();
const prisma = new PrismaClient();

// Get all users
// Accessible to everyone
usersRouter.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get user by ID
// Accessible to everyone
usersRouter.get('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: { user_id: userId },
        });
        res.send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new user
// Accessible to everyone
usersRouter.post('/', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body,
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a user
// restricted to authenticated users
usersRouter.put('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const updatedUser = await prisma.user.update({
            where: { user_id: userId },
            data: req.body,
        });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a user
// restricted to authenticated users
usersRouter.delete('/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        await prisma.user.delete({
            where: { user_id: userId },
        });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = usersRouter;

