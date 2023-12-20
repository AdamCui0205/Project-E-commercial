const express = require('express');
const { PrismaClient } =require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();
const saltRounds = 12;


router.post('/register', async(req,res) => {
    const { username, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        const token = jwt.sign({ id: newUser.id }, process.env.SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch(err){
        res.status(500).send(err.message);
    }
})

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try{
        console.log("Logging in user:", username);
        const user = await prisma.user.findUnique({
            where: { username: username },
        })

        if(user && await bcrypt.compare(password, user.password)){
            const token = jwt.sign({ id: user.id }, process.env.SECRET,{ expireIn: '1h'});
            res.json({ token });
        } else {
            res.sendStatus(401);
        }

    } catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;