const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Import routes
const cartItemsRoutes = require('./api/cartItems');
const ordersRoutes = require('./api/orders');
const productsRoutes = require('./api/products');
const usersRoutes = require('./api/users');
const authRoutes = require('./auth/auth');

require('dotenv').config();

// Middleware for CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware for parsing body of incoming requests
app.use(express.json());

// Use the imported routes
app.use('/api/cart-items', cartItemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/auth', authRoutes);

// Log current working directory to debug the issue
console.log('Current working directory:', process.cwd());

// Serve static files from the React app
const viteBuildPath = path.join(process.cwd(), 'dist');
console.log('Resolved path to dist:', viteBuildPath);

app.use(express.static(viteBuildPath));

// The catch-all route: for any request that doesn't match other routes,
// send back the app's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(viteBuildPath, 'index.html'), (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send(err.message);
        }
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
