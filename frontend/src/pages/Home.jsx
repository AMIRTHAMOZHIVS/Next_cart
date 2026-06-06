import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/products');
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching products', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            <header className="home-header">
                <h1 className="heading-gradient text-4xl mb-2">Discover Premium Gear</h1>
                <p className="text-muted">Upgrade your lifestyle with our curated collection.</p>
            </header>
            
            {loading ? (
                <div className="loading-container"><div className="spinner"></div></div>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
