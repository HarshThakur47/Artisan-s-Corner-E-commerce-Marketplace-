import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/slices/productSlice';
import { FaArrowRight, FaStar } from 'react-icons/fa';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    dispatch(getProducts());
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  // Scroll Reveal Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);
  
  const featuredProducts = products.slice(0, 4);
  const categories = ['Handmade Crafts', 'Pottery & Ceramics', 'Textiles', 'Jewelry'];

  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}> {/* Override padding for full hero */}
      
      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Blobs */}
        <div className="blob blob-1" style={{ transform: `translateY(${scrollY * 0.2}px)` }} />
        <div className="blob blob-2" style={{ transform: `translateY(${scrollY * -0.15}px)` }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', animation: 'fadeIn 1s ease' }}>
              Handcrafted that Performs.
              <br />
              <span style={{ fontWeight: '300', opacity: 0.8 }}>Created for Artisan Lovers.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', animation: 'fadeIn 1s ease 0.2s backwards' }}>
              Explore our curated collection of unique, handmade crafts from talented artisans.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', animation: 'fadeIn 1s ease 0.4s backwards' }}>
              <Link to="/products" className="btn-primary" style={{ width: 'auto', padding: '14px 32px' }}>
                Explore Products <FaArrowRight />
              </Link>
              <Link to="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="scroll-reveal" style={{ padding: '6rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Explore Our Collections</h2>
          <div className="grid-4">
            {categories.map((category, index) => (
              <Link key={index} to={`/products?category=${category}`} className="glass-card" style={{ textAlign: 'center', textDecoration: 'none', padding: '3rem 2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                  {['🎨', '🏺', '🧵', '💎'][index]}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{category}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Explore Collection →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="scroll-reveal" style={{ padding: '6rem 0', background: 'var(--surface-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>New Products</h2>
            <Link to="/products" className="btn-outline">Shop now</Link>
          </div>

          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid-4">
              {featuredProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="glass-card" style={{ padding: '1rem', textDecoration: 'none', position: 'relative' }}>
                  {product.countInStock === 0 && <span className="card-badge bg-red">Out of Stock</span>}
                  {product.countInStock > 0 && product.countInStock < 5 && <span className="card-badge bg-blue">New</span>}
                  
                  <div className="img-zoom-container" style={{ height: '250px', marginBottom: '1rem' }}>
                    <img src={product.image} alt={product.name} className="img-zoom" />
                  </div>
                  
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{product.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>₹{product.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B' }}>
                      <FaStar /> <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{product.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;