const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');

// Get user cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
        if (!cart) {
            cart = new Cart({ userId: req.user.userId, items: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            cart = new Cart({ userId: req.user.userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Product exists in cart, update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new product
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        cart = await cart.populate('items.productId');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove item from cart
router.post('/remove', authMiddleware, async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        
        await cart.save();
        cart = await cart.populate('items.productId');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Clear cart
router.delete('/clear', authMiddleware, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.userId });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
