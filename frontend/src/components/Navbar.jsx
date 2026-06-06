import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <nav className="navbar glass">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="heading-gradient">NextCart</span>
                </Link>
                <div className="navbar-links">
                    <Link to="/cart" className="nav-icon-link">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    {user ? (
                        <div className="user-menu">
                            <span className="user-greeting">Hi, {user.name}</span>
                            <button onClick={logout} className="nav-icon-link btn-logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-icon-link">
                            <User size={24} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
