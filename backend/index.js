const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000; // Change the port number here
require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5174'], // Update this to match your frontend URL
    credentials: true
}));

// Password: 86jQZRbs5IqVc1zc
// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route'); // Import the orders route
const userRoutes = require('./src/users/user.route'); // Import the user route
const adminRoutes = require('./src/stats/admin.stats'); // Import the admin stats route

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes); // Register the orders route
app.use('/api/auth', userRoutes); // Register the user route
app.use('/api/admin', adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Book store server is running!');
    });
}

main().then(() => console.log('MongoDb connected successfully')).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});