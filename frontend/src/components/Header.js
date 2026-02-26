import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaChartPie } from 'react-icons/fa';

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

  // --- NEW: Scroll To About Function ---
  const scrollToAbout = () => {
    const footer = document.getElementById('about-section');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          {/* LEFT: Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>A</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text)' }}>Artisan Corner</span>
            </Link>
          </div>

          {/* CENTER: Nav */}
          <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '2rem' }} className="hidden-mobile">
            <Link to="/products" className="nav-link">Shop</Link>
            {/* UPDATED: Button for Scrolling */}
            <button onClick={scrollToAbout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: '8px 0' }}>About</button>
          </nav>

          {/* RIGHT: Actions */}
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
                  <div className="glass-card animate-fade-in" style={{ 
                      position: 'absolute', 
                      right: 0, 
                      top: '140%', 
                      width: '240px', 
                      padding: '8px', 
                      zIndex: 100, 
                      borderRadius: '16px',
                      border: '1px solid var(--glass-border)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      background: 'var(--surface)' 
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
                      <p style={{ fontWeight: '700', color: 'var(--text)', fontSize: '0.95rem', marginBottom: '2px' }}>{user.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Link to="/profile" className="menu-item" onClick={() => setIsUserMenuOpen(false)}>
                        <FaUser size={14} className="menu-icon" /> Profile Settings
                      </Link>
                      
                      {user.isAdmin && (
                        <Link to="/admin" className="menu-item" onClick={() => setIsUserMenuOpen(false)}>
                          <FaChartPie size={14} className="menu-icon" /> Admin Dashboard
                        </Link>
                      )}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', marginTop: '8px', paddingTop: '8px' }}>
                      <button onClick={handleLogout} className="menu-item logout-btn">
                        <FaSignOutAlt size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden-mobile" style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn-primary" style={{ padding: '8px 20px', width: 'auto' }}>Sign Up</Link>
              </div>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }} className="mobile-only">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu mobile-only">
            <Link to="/products" className="nav-link" style={{ display: 'block', padding: '10px 0' }} onClick={() => setIsMenuOpen(false)}>Shop</Link>
            {/* UPDATED: Mobile About Button */}
            <button onClick={() => { scrollToAbout(); setIsMenuOpen(false); }} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: '10px 0', width: '100%', textAlign: 'left' }}>About</button>
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
        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          color: var(--text);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }
        .menu-item:hover {
          background: var(--surface-light);
          color: var(--primary);
        }
        .menu-icon {
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .menu-item:hover .menu-icon {
          color: var(--primary);
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          color: #EF4444 !important;
        }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
      `}</style>
    </header>
  );
};

export default Header;