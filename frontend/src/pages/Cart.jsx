import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

const CartPage = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="cart-page flex-center animate-fade-in">
                <h2>Please <Link to="/login" className="text-primary">log in</Link> to view your cart.</h2>
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="cart-page flex-center animate-fade-in">
                <h2>Your cart is empty.</h2>
                <Link to="/" className="btn btn-primary mt-lg">Start Shopping</Link>
            </div>
        );
    }

    const total = cart.items.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);

    return (
        <div className="cart-page animate-fade-in">
            <h1 className="heading-gradient text-4xl mb-xl">Your Cart</h1>
            <div className="cart-layout">
                <div className="cart-items">
                    {cart.items.map(item => (
                        <div key={item.productId._id} className="cart-item glass">
                            <img src={item.productId.imageUrl} alt={item.productId.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.productId.name}</h3>
                                <p className="cart-item-price">${item.productId.price.toFixed(2)}</p>
                                <div className="cart-item-quantity">
                                    <span>Qty: {item.quantity}</span>
                                </div>
                            </div>
                            <button 
                                className="btn-icon text-error" 
                                onClick={() => removeFromCart(item.productId._id)}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary glass">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-primary btn-block mt-lg">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
