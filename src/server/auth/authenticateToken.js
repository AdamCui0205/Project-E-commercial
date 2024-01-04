const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// const secretKey = process.env.JWT_SECRET;

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'No token provided' });
    const isValid = jwt.verify(token, process.env.JWT_SECRET)

    if (!isValid) {
        res.status(403).send({message: "nope!"})
        return
    }

    const user = await prisma.user.findFirst({
        where:{
            user_id: isValid.user_id
        }
    })

    console.log(user)

    req.user = user;
    next();
}

module.exports = authenticateToken;