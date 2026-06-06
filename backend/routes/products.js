const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Seed products (utility route to populate DB)
router.post('/seed', async (req, res) => {
    const sampleProducts = [
        { name: 'Wireless Headphones', description: 'High quality noise-cancelling wireless headphones.', price: 199.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', category: 'Electronics' },
        { name: 'Minimalist Watch', description: 'Elegant, simple, and stylish watch.', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', category: 'Accessories' },
        { name: 'Smart Speaker', description: 'Voice-controlled smart speaker with rich sound.', price: 99.99, imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80', category: 'Electronics' },
        { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with tactile switches.', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80', category: 'Electronics' },
        { name: 'Coffee Maker', description: 'Automatic coffee maker with timer.', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80', category: 'Home' },
        { name: 'Running Shoes', description: 'Lightweight and comfortable running shoes.', price: 119.99, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', category: 'Sports' }
    ];

    try {
        await Product.deleteMany(); // Clear existing products
        const products = await Product.insertMany(sampleProducts);
        res.status(201).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
