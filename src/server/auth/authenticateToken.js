const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const e = require('express');
const prisma = new PrismaClient()
// const secretKey = process.env.JWT_SECRET;

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(`token in authenticateToken: ${token}`)

    if (!token) return res.status(401).json({ message: 'No token provided' });
    console.log(`jwt secret ${process.env.JWT_SECRET}`)
    
    let isValid = false;
    try {
        isValid = jwt.verify(token, process.env.JWT_SECRET)
        isValid = true;
    } catch(err) {
        console.error(err);
    }

    if (!isValid) {
        res.status(403).send({message: "nope!"})
        return
    }

    const decodedToken = jwt.decode(token)
    console.log(`decoded auth token to`, decodedToken)

    const user = await prisma.user.findFirst({
        where:{
            user_id: decodedToken.user_id
        }
    })

    console.log(user)

    req.user = user;
    next();
}

module.exports = authenticateToken;