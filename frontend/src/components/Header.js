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
  const mobileMenuRef = useRef(null);
  
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.qty, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const isMobileMenuButton = event.target.closest('.mobile-menu-button');
        if (!isMobileMenuButton) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none'
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div 
              style={{
                width: '40px',
                height: '40px',
                background: '#2c2c2c',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              className="group-hover:scale-105 group-hover:rotate-3"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#e8e4dc"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#e8e4dc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span 
              style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                color: '#2c2c2c',
                letterSpacing: '0.5px',
                transition: 'color 0.3s ease'
              }}
              className="group-hover:text-green"
            >
              Artisan Corner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { name: 'Shop', path: '/products' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  color: '#2c2c2c',
                  fontSize: '15px',
                  fontWeight: '400',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  padding: '8px 0'
                }}
                className="nav-link"
              >
                {item.name}
                <span 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    background: '#1a3a2e',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className="nav-underline"
                />
              </Link>
            ))}
          </nav>

          <style>{`
            .nav-link:hover {
              color: #1a3a2e;
            }
            .nav-link:hover .nav-underline {
              width: 100%;
            }
          `}</style>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Icon with ripple effect */}
            <Link 
              to="/cart"
              style={{
                position: 'relative',
                padding: '10px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px'
              }}
              className="cart-button"
            >
              <FaShoppingCart size={20} color="#2c2c2c" />
              {cartItemsCount > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    background: '#2c2c2c',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '600',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse-scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <style>{`
              .cart-button:hover {
                background: rgba(0,0,0,0.04);
                transform: scale(1.05);
              }
              @keyframes pulse-scale {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.1);
                }
              }
            `}</style>

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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '50%'
                  }}
                  className="user-menu-button"
                >
                  <div 
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#1a3a2e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    className="user-avatar"
                  >
                    <FaUser size={16} color="#fff" />
                  </div>
                </button>

                <style>{`
                  .user-menu-button:hover .user-avatar {
                    transform: scale(1.1);
                    box-shadow: 0 4px 12px rgba(26, 58, 46, 0.3);
                  }
                `}</style>

                {/* User Dropdown with Apple-style blur */}
                {isUserMenuOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 12px)',
                      background: 'rgba(255, 255, 255, 0.95)', 
                      backdropFilter: 'blur(20px)',
                      borderRadius: '16px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)', 
                      minWidth: '220px',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      overflow: 'hidden',
                      zIndex: 9999, 
                      animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <style>{`
                      @keyframes slideDown {
                        from {
                          opacity: 0;
                          transform: translateY(-10px);
                        }
                        to {
                          opacity: 1;
                          transform: translateY(0);
                        }
                      }
                    `}</style>
                    
                    <div style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      background: 'rgba(26, 58, 46, 0.04)'
                    }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#2c2c2c', margin: 0 }}>
                        {user.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#999', margin: 0, marginTop: '2px' }}>
                        {user.email}
                      </p>
                    </div>
                    
                    <div style={{ padding: '8px' }}>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          color: '#2c2c2c',
                          fontSize: '14px',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          borderRadius: '8px',
                          fontWeight: '500'
                        }}
                        className="dropdown-item"
                      >
                        My Profile
                      </Link>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          style={{
                            display: 'block',
                            padding: '12px 16px',
                            color: '#2c2c2c',
                            fontSize: '14px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            borderRadius: '8px',
                            fontWeight: '500'
                          }}
                          className="dropdown-item"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                    
                    <div style={{ padding: '8px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'transparent',
                          border: 'none',
                          color: '#c97d3f',
                          fontSize: '14px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          borderRadius: '8px',
                          fontWeight: '500'
                        }}
                        className="dropdown-item logout-item"
                      >
                        Logout
                      </button>
                    </div>

                    <style>{`
                      .dropdown-item:hover {
                        background: rgba(26, 58, 46, 0.08);
                        transform: translateX(4px);
                      }
                      .logout-item:hover {
                        background: rgba(201, 125, 63, 0.1);
                        transform: translateX(4px);
                      }
                    `}</style>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  style={{
                    padding: '10px 20px',
                    color: '#2c2c2c',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className="login-button"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{
                    fontSize: '14px',
                    padding: '10px 24px'
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <style>{`
              .login-button:hover {
                background: rgba(0,0,0,0.04);
                transform: translateY(-2px);
              }
            `}</style>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden mobile-menu-button"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) ${isMenuOpen ? 'rotate(0deg)' : 'rotate(0deg)'}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isMenuOpen ? 0 : 1
                }}>
                  <FaBars size={24} color="#2c2c2c" />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) ${isMenuOpen ? 'rotate(90deg)' : 'rotate(-90deg)'}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isMenuOpen ? 1 : 0
                }}>
                  <FaTimes size={24} color="#2c2c2c" />
                </div>
              </div>
            </button>

            <style>{`
              .mobile-menu-button:hover {
                background: rgba(0,0,0,0.04);
              }
            `}</style>
          </div>
        </div>

        {/* Mobile Menu with Apple blur */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="lg:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { name: 'Shop', path: '/products' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: '#2c2c2c',
                    fontSize: '16px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease'
                  }}
                  className="mobile-nav-item"
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <>
                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '8px 0' }} />
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      color: '#2c2c2c',
                      fontSize: '16px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      transition: 'all 0.2s ease'
                    }}
                    className="mobile-nav-item"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary"
                    style={{
                      fontSize: '16px',
                      marginTop: '8px',
                      justifyContent: 'center'
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>

            <style>{`
              .mobile-nav-item:hover {
                background: rgba(26, 58, 46, 0.08);
                transform: translateX(4px);
              }
            `}</style>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
