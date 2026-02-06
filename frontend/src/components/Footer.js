import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#e8e4dc', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container" style={{ padding: '4rem 2rem 2rem' }}>
        {/* Main Footer Content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Logo & Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#2c2c2c',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#e8e4dc"/>
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#e8e4dc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#2c2c2c' }}>
                Artisan Corner
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#5a5a5a', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Handcrafted excellence created for artisan lovers. Discover unique pieces from talented makers.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1px solid #2c2c2c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2c2c2c';
                  e.currentTarget.querySelector('svg').style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.querySelector('svg').style.color = '#2c2c2c';
                }}
              >
                <FaFacebook size={16} color="#2c2c2c" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1px solid #2c2c2c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2c2c2c';
                  e.currentTarget.querySelector('svg').style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.querySelector('svg').style.color = '#2c2c2c';
                }}
              >
                <FaInstagram size={16} color="#2c2c2c" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1px solid #2c2c2c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2c2c2c';
                  e.currentTarget.querySelector('svg').style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.querySelector('svg').style.color = '#2c2c2c';
                }}
              >
                <FaLinkedin size={16} color="#2c2c2c" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#2c2c2c', marginBottom: '1.5rem' }}>
              Shop
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['All Products', 'New Arrivals', 'Best Sellers', 'Special Offers'].map((link) => (
                <Link
                  key={link}
                  to="/products"
                  style={{
                    fontSize: '0.9rem',
                    color: '#5a5a5a',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseLeave={(e) => e.target.style.color = '#5a5a5a'}
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#2c2c2c', marginBottom: '1.5rem' }}>
              Company
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['About Us', 'Our Artisans', 'Sustainability', 'Careers'].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    fontSize: '0.9rem',
                    color: '#5a5a5a',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseLeave={(e) => e.target.style.color = '#5a5a5a'}
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#2c2c2c', marginBottom: '1.5rem' }}>
              Support
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Contact Us', 'FAQs', 'Shipping & Returns', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                  style={{
                    fontSize: '0.9rem',
                    color: '#5a5a5a',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseLeave={(e) => e.target.style.color = '#5a5a5a'}
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#1a3a2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
          }}
        >
          <FaWhatsapp size={28} color="#fff" />
        </a>

        {/* Bottom Bar */}
        <div 
          style={{
            borderTop: '1px solid rgba(0,0,0,0.06)',
            paddingTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{ 
            display: 'flex', 
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Link 
              to="/contact" 
              style={{ fontSize: '0.9rem', color: '#5a5a5a', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#2c2c2c'}
              onMouseLeave={(e) => e.target.style.color = '#5a5a5a'}
            >
              Contact Us
            </Link>
            <Link 
              to="/privacy-policy" 
              style={{ fontSize: '0.9rem', color: '#5a5a5a', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#2c2c2c'}
              onMouseLeave={(e) => e.target.style.color = '#5a5a5a'}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-and-conditions" 
              style={{ fontSize: '0.9rem', color: '#5a5a5a', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#2c2c2c'}
              onMouseLeave={(e) => e.target.style.color = '#5a5a5a'}
            >
              Terms & Conditions
            </Link>
          </div>
          
          <p style={{ fontSize: '0.875rem', color: '#999', margin: 0, textAlign: 'center' }}>
            © Artisan Corner {currentYear}. All Rights Reserved
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          background: '#fff',
          border: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#2c2c2c';
          e.currentTarget.querySelector('svg').style.color = '#fff';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#fff';
          e.currentTarget.querySelector('svg').style.color = '#2c2c2c';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
