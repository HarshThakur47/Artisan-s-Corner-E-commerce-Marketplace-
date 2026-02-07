import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaTwitter, FaHeart } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import Theme

const Footer = () => {
  const { colors } = useTheme(); // Get Colors

  return (
    <footer 
      style={{
        background: colors.surface, // FIX: Dynamic Background
        borderTop: `1px solid ${colors.border}`,
        padding: '4rem 0 2rem',
        marginTop: 'auto',
        color: colors.text, // FIX: Dynamic Text Color
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div style={{ 
                width: '32px', height: '32px', 
                background: colors.primary, // Dynamic Brand Color
                borderRadius: '8px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>A</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Artisan Corner</span>
            </div>
            <p style={{ color: colors.textSecondary, fontSize: '0.9rem', lineHeight: '1.6' }}>
              Connecting you with India's finest artisans and their handcrafted legacy. Built with love for culture.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Shop</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/products" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>All Products</Link></li>
              <li><Link to="/products?category=Ceramics" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>Ceramics</Link></li>
              <li><Link to="/products?category=Textiles" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>Textiles</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/about" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>Contact</Link></li>
              <li><Link to="/privacy" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Stay Updated</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter email" 
                style={{ 
                  width: '100%', 
                  padding: '10px 16px', 
                  borderRadius: '8px', 
                  border: `1px solid ${colors.border}`, 
                  background: colors.background,
                  color: colors.text,
                  outline: 'none'
                }}
              />
              <button style={{ 
                background: colors.primary, 
                color: '#fff', 
                border: 'none', 
                padding: '10px 16px', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}>
                →
              </button>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: `1px solid ${colors.divider}`, 
          paddingTop: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          md: { flexDirection: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '1rem' 
        }}>
          <p style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>© 2024 Artisan's Corner. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', color: colors.textSecondary }}>
            <FaGithub size={20} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary} />
            <FaInstagram size={20} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary} />
            <FaTwitter size={20} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;