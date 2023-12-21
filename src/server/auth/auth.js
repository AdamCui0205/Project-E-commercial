const express = require('express');
const { PrismaClient } =require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

const saltRounds = 12;

router.post('/register', async (req, res, next) => {
    const { username, password, email, phone, first_name, last_name, can_sell, address, addressLine2, city, state, zip } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
                phone,
                first_name,
                last_name,
                can_sell,
                address,
                addressLine2,
                city,
                state,
                zip
            },
        });

        const token = jwt.sign({ user_id: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
       console.error(error.message);
       next(error);
    }
});

router.post('/login', async(req, res, next) => {
    const { username, password } = req.body;
    try{
        const user = await prisma.user.findUnique({
            where: { username: username },
        });

        if(user){
            await bcrypt.compare(password, user.password)
            const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h'});
            res.json({ token });
        } else {
            res.sendStatus(401);
        }

    } catch(error){
        console.error(error.message);
        next(error);
    }
});

module.exports = router;