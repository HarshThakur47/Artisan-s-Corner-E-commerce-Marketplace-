import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/slices/productSlice';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // 1. Import Theme Hook

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const { isDark, colors } = useTheme(); // 2. Get Theme Values
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    dispatch(getProducts());
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [products]);
  
  const featuredProducts = products.slice(0, 4);
  const categories = ['Handmade Crafts', 'Pottery & Ceramics', 'Textiles', 'Jewelry'];

  return (
    // 3. Dynamic Background: Beige in Light Mode, Dark Void in Dark Mode
    <div style={{ background: isDark ? colors.background : '#e8e4dc', transition: 'background 0.3s ease' }}>
      
      {/* Hero Section */}
      <section 
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '80px'
        }}
      >
        {/* Background decorative elements */}
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.3)', // Purple glow in dark mode
            borderRadius: '50%',
            filter: 'blur(100px)',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: isDark ? 'rgba(139, 92, 246, 0.05)' : 'rgba(26, 58, 46, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            transform: `translateY(${scrollY * -0.15}px)`
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 
              style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '400',
                color: isDark ? colors.text : '#2c2c2c', // Dynamic Text
                marginBottom: '1.5rem',
                lineHeight: '1.1',
                letterSpacing: '-2px',
                animation: 'fadeIn 1s ease'
              }}
            >
              Handcrafted that Performs.
              <br />
              <span style={{ fontWeight: '300', opacity: 0.8 }}>Created for Artisan Lovers.</span>
            </h1>
            <p 
              style={{
                fontSize: '1.125rem',
                color: isDark ? colors.textSecondary : '#5a5a5a', // Dynamic Secondary Text
                marginBottom: '3rem',
                lineHeight: '1.8',
                animation: 'fadeIn 1s ease 0.2s backwards'
              }}
            >
              Explore our curated collection of unique, handmade crafts from talented artisans. 
              Each piece tells a story of tradition, skill, and passion.
            </p>
            <div 
              style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: 'fadeIn 1s ease 0.4s backwards'
              }}
            >
              {/* Dynamic Button Color: Black/Purple in Light, Vibrant Purple in Dark */}
              <Link to="/products" className="btn-primary" style={{
                  background: colors.primary,
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600'
              }}>
                Explore Products <FaArrowRight />
              </Link>
              <Link to="/about" className="btn-outline" style={{
                  border: `2px solid ${isDark ? colors.text : '#2c2c2c'}`,
                  color: isDark ? colors.text : '#2c2c2c',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600'
              }}>
                Learn More
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div 
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'fadeIn 1s ease 0.6s backwards'
            }}
          >
            <div 
              style={{
                width: '24px',
                height: '36px',
                border: `2px solid ${isDark ? colors.text : '#2c2c2c'}`,
                borderRadius: '12px',
                position: 'relative'
              }}
            >
              <div 
                style={{
                  width: '4px',
                  height: '8px',
                  background: isDark ? colors.text : '#2c2c2c',
                  borderRadius: '2px',
                  position: 'absolute',
                  top: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'scroll 1.5s ease infinite'
                }}
              />
            </div>
            <style>{`
              @keyframes scroll {
                0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
                50% { opacity: 0.3; transform: translateX(-50%) translateY(8px); }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '6rem 0' }} className="scroll-reveal">
        <div className="container">
          <h2 
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              color: isDark ? colors.text : '#2c2c2c',
              textAlign: 'center',
              marginBottom: '4rem',
              letterSpacing: '-1px'
            }}
          >
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category}`}
                style={{
                  background: isDark ? colors.surface : '#fff', // White vs Dark Surface
                  borderRadius: '16px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: isDark ? `1px solid ${colors.border}` : '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div 
                  style={{
                    width: '80px',
                    height: '80px',
                    background: isDark ? colors.surfaceLight : '#e8e4dc',
                    borderRadius: '50%',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}
                >
                  {index === 0 && '🎨'}
                  {index === 1 && '🏺'}
                  {index === 2 && '🧵'}
                  {index === 3 && '💎'}
                </div>
                <h3 
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    color: isDark ? colors.text : '#2c2c2c',
                    marginBottom: '0.5rem'
                  }}
                >
                  {category}
                </h3>
                <p style={{ fontSize: '0.9rem', color: isDark ? colors.textSecondary : '#999', margin: 0 }}>
                  Explore Collection →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '6rem 0', background: isDark ? colors.surfaceLight : '#f5f3ef' }} className="scroll-reveal">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '400',
                color: isDark ? colors.text : '#2c2c2c',
                marginBottom: '1rem',
                letterSpacing: '-1px'
              }}
            >
              New Products
            </h2>
            <Link 
              to="/products"
              style={{
                fontSize: '1rem',
                color: isDark ? colors.text : '#2c2c2c',
                textDecoration: 'none',
                border: `1px solid ${isDark ? colors.text : '#2c2c2c'}`,
                padding: '10px 24px',
                borderRadius: '8px',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? colors.text : '#2c2c2c';
                e.currentTarget.style.color = isDark ? colors.background : '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = isDark ? colors.text : '#2c2c2c';
              }}
            >
              Shop now
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} style={{ background: isDark ? colors.surface : '#fff', borderRadius: '16px', padding: '1.5rem' }}>
                  <div style={{ height: '280px', background: isDark ? colors.surfaceLight : '#e8e4dc', borderRadius: '12px', marginBottom: '1rem' }} className="loading" />
                  <div style={{ height: '20px', background: isDark ? colors.surfaceLight : '#e8e4dc', borderRadius: '4px', marginBottom: '0.5rem' }} className="loading" />
                  <div style={{ height: '20px', background: isDark ? colors.surfaceLight : '#e8e4dc', borderRadius: '4px', width: '60%' }} className="loading" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  style={{
                    background: isDark ? colors.surface : '#fff',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    border: isDark ? `1px solid ${colors.border}` : '1px solid rgba(0,0,0,0.06)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `0 16px 32px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.12)'}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {product.countInStock === 0 ? (
                    <span className="badge-corner badge badge-sale">Out of Stock</span>
                  ) : product.countInStock < 5 ? (
                    <span className="badge-corner badge badge-new">NEW</span>
                  ) : null}
                  
                  <div 
                    style={{
                      overflow: 'hidden',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      height: '280px'
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                  
                  <h3 
                    style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: isDark ? colors.text : '#2c2c2c',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {product.name}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={12}
                          color={i < Math.floor(product.rating || 0) ? '#c97d3f' : '#d4d0c8'}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.875rem', color: '#999' }}>
                      ({product.numReviews || 0})
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: '600', color: isDark ? colors.text : '#2c2c2c', margin: 0 }}>
                      From ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '8rem 0' }} className="scroll-reveal">
        <div className="container">
          <div 
            style={{
              background: isDark ? colors.surface : '#1a3a2e', // Green in Light, Dark Surface in Dark
              borderRadius: '24px',
              padding: '5rem 3rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                filter: 'blur(60px)'
              }}
            />
            <h2 
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '400',
                color: '#fff',
                marginBottom: '1.5rem',
                letterSpacing: '-1px',
                position: 'relative',
                zIndex: 1
              }}
            >
              Set the standard for artisan excellence in your home.
              <br />
              Let us help you make your space memorable.
            </h2>
            <Link 
              to="/products"
              style={{
                background: '#fff',
                color: isDark ? colors.background : '#1a3a2e',
                padding: '16px 40px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              See products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;