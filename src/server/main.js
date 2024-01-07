const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dtnm1xt5q',
    api_key: '716463253383252',
    api_secret: 'QK7ClPf4QtbGzk9gtMgVflQWv80'
});
const path = require('path');
const port = process.env.PORT || 4200;
const cors = require('cors');

// Import routes
const cartItemsRoutes = require('./api/cartItems');
const ordersRoutes = require('./api/orders');
const productsRoutes = require('./api/products');
const usersRoutes = require('./api/users');
const authRoutes = require('./auth/auth');


const fileUpload = require('express-fileupload');

// Enable files upload
app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true, // Save uploads to temporary files
    tempFileDir: '/tmp/' // Temporary files directory
}));




require('dotenv').config();

app.use(cors());

// Middleware for parsing body of incoming requests
app.use(express.json());



// Use the imported routes
app.use('/api/cart-items', cartItemsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/auth', authRoutes);

// Serve static files
const viteBuildPath = path.join(process.cwd(), 'dist');
app.use(express.static(viteBuildPath));


// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
