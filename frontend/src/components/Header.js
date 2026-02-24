import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userMenuRef = useRef(null);
  const auth = useSelector((state) => state.auth) || {};
  const { user } = auth;
  const cart = useSelector((state) => state.cart) || {};
  const { cartItems = [] } = cart;

  const cartCount = Array.isArray(cartItems) 
    ? cartItems.reduce((acc, item) => acc + (item.qty || 1), 0) 
    : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          {/* LEFT: Logo (Flex 1 ensures it pushes against center equally) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>A</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text)' }}>Artisan Corner</span>
            </Link>
          </div>

          {/* CENTER: Navigation (Flex 1 centered) */}
          <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }} className="hidden-mobile">
            <Link to="/products" className="nav-link">Shop</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>

          {/* RIGHT: Actions (Flex 1 right aligned) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/cart" style={{ position: 'relative', color: 'var(--text)' }}>
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="badge-success" style={{ position: 'absolute', top: '-8px', right: '-8px', borderRadius: '50%', padding: '2px 6px', fontSize: '10px', color: 'white', background: 'var(--error)' }}>
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div style={{ position: 'relative' }} ref={userMenuRef}>
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaUser color="white" size={14} />
                  </div>
                </button>
                {isUserMenuOpen && (
                  <div className="glass-card" style={{ position: 'absolute', right: 0, top: '120%', minWidth: '200px', padding: '1rem', zIndex: 100 }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{user.name}</p>
                    <Link to="/profile" className="nav-link" style={{ display: 'block' }}>Profile</Link>
                    {user.isAdmin && <Link to="/admin" className="nav-link" style={{ display: 'block' }}>Dashboard</Link>}
                    <button onClick={handleLogout} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '0.5rem', fontWeight: '600' }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden-mobile" style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn-primary" style={{ padding: '8px 20px', width: 'auto' }}>Sign Up</Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }} className="mobile-only">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu mobile-only">
            <Link to="/products" className="nav-link" style={{ display: 'block', padding: '10px 0' }} onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/about" className="nav-link" style={{ display: 'block', padding: '10px 0' }} onClick={() => setIsMenuOpen(false)}>About</Link>
            {!user && (
              <>
                <Link to="/login" className="nav-link" style={{ display: 'block', padding: '10px 0' }} onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
      `}</style>
    </header>
  );
};

export default Header;