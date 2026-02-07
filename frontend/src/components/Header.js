import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        if (!event.target.closest('.mobile-menu-button')) {
          setIsMenuOpen(false);
        }
      }
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
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled 
          ? `${colors.surface}ee` 
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
        boxShadow: scrolled ? `0 4px 12px ${colors.shadow}` : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0' }}>
          
          {/* Logo */}
          <Link 
            to="/" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
            onClick={() => setIsMenuOpen(false)}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              boxShadow: `0 4px 12px ${colors.shadow}`
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) rotate(3deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#fff"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#fff" strokeWidth="2"/>
              </svg>
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: colors.text,
              letterSpacing: '0.3px'
            }}>
              Artisan Corner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '3rem' }} className="hidden-mobile">
            {[
              { name: 'Shop', path: '/products' },
              { name: 'About', path: '/about' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  color: colors.text,
                  fontSize: '15px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  padding: '8px 10px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.querySelector('.nav-underline').style.width = '100%';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.text;
                  e.currentTarget.querySelector('.nav-underline').style.width = '0';
                }}
              >
                {item.name}
                <span 
                  className="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    background: colors.primary,
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            {/* Cart */}
            <Link 
              to="/cart"
              style={{
                position: 'relative',
                padding: '10px',
                borderRadius: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.hover;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FaShoppingCart size={20} color={colors.text} />
              {cartItemsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: colors.error,
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '600',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite'
                }}>
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div style={{ position: 'relative' }} ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.hover;
                    e.currentTarget.querySelector('.user-avatar').style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.querySelector('.user-avatar').style.transform = 'scale(1)';
                  }}
                >
                  <div 
                    className="user-avatar"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <FaUser size={16} color="#fff" />
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 12px)',
                    background: colors.surface,
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderRadius: '12px',
                    boxShadow: `0 8px 32px ${colors.shadow}`,
                    minWidth: '220px',
                    border: `1px solid ${colors.border}`,
                    overflow: 'hidden',
                    animation: 'slideDown 0.3s ease'
                  }}>
                    <div style={{ 
                      padding: '16px', 
                      borderBottom: `1px solid ${colors.divider}`,
                      background: `${colors.primary}15`
                    }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: colors.text, margin: 0 }}>
                        {user.name}
                      </p>
                      <p style={{ fontSize: '12px', color: colors.textSecondary, margin: 0, marginTop: '2px' }}>
                        {user.email}
                      </p>
                    </div>
                    
                    <div style={{ padding: '8px' }}>
                      <Link to="/profile" onClick={() => setIsUserMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          color: colors.text,
                          fontSize: '14px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          borderRadius: '8px',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.hover;
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        My Profile
                      </Link>
                      {user.isAdmin && (
                        <Link to="/admin" onClick={() => setIsUserMenuOpen(false)}
                          style={{
                            display: 'block',
                            padding: '12px 16px',
                            color: colors.text,
                            fontSize: '14px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            borderRadius: '8px',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.hover;
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                    
                    <div style={{ padding: '8px', borderTop: `1px solid ${colors.divider}` }}>
                      <button onClick={handleLogout}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'transparent',
                          border: 'none',
                          color: colors.error,
                          fontSize: '14px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderRadius: '8px',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `${colors.error}15`;
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden-mobile">
                <Link to="/login" className="btn-text">Login</Link>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button mobile-only"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.hover}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                <FaBars 
                  size={24} 
                  color={colors.text}
                  style={{
                    position: 'absolute',
                    opacity: isMenuOpen ? 0 : 1,
                    transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'all 0.3s ease'
                  }}
                />
                <FaTimes 
                  size={24} 
                  color={colors.text}
                  style={{
                    position: 'absolute',
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Slide Animation */}
        <div
          ref={mobileMenuRef}
          style={{
            maxHeight: isMenuOpen ? '500px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            background: colors.surface,
            borderRadius: isMenuOpen ? '16px' : '0',
            marginBottom: isMenuOpen ? '1rem' : '0',
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
            boxShadow: isMenuOpen ? `0 8px 24px ${colors.shadow}` : 'none'
          }}
          className="mobile-only"
        >
          <nav style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { name: 'Shop', path: '/products' },
              { name: 'About', path: '/about' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  color: colors.text,
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.hover}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {item.name}
              </Link>
            ))}
            {!user && (
              <>
                <div style={{ height: '1px', background: colors.divider, margin: '8px 0' }} />
                <Link to="/login" onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: colors.text,
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.hover}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary" style={{ marginTop: '8px' }}>
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 1025px) {
          .mobile-only { display: none !important; }
        }
        .btn-text {
          padding: 10px 20px;
          color: ${colors.text};
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .btn-text:hover {
          background: ${colors.hover};
        }
        .btn-primary {
          padding: 10px 24px;
          background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark});
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: inline-block;
          text-align: center;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px ${colors.shadow};
        }
      `}</style>
    </header>
  );
};

export default Header;
