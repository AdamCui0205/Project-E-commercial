const express = require('express');
const ViteExpress = require('vite-express');

const app = express();
const port = process.env.PORT || 3000;

const cartItemsRoutes = require('./api/cartItems');
const ordersRoutes = require('./api/orders');
const productsRoutes = require('./api/products');
const usersRoutes = require('./api/users');
const authRoutes = require('./auth/auth');
// const authenticateToken = require('./auth/authenticateToken');

// Middleware for parsing body of incoming requests
app.use(express.json());

// Use the imported routes
app.use('/api/cart-items', cartItemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/auth', authRoutes);

// app.get('/protected-route', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route' });
// });

ViteExpress.listen(port, () => {
  console.log(`Server running on port ${port}`);
});