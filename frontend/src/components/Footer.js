import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaTwitter, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { colors, isDark } = useTheme();
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Toggle scrolling on body when modal is open
  React.useEffect(() => {
    if (showPrivacy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showPrivacy]);

  return (
    <>
      <footer 
        style={{
          background: colors.surface,
          borderTop: `1px solid ${colors.border}`,
          padding: '4rem 0 2rem',
          marginTop: 'auto',
          color: colors.text,
          transition: 'background 0.3s ease, color 0.3s ease'
        }}
      >
        <br />
        <br />
        <br />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"> {/* Changed to 3 columns */}
            
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div style={{ 
                  width: '32px', height: '32px', 
                  background: colors.primary, 
                  borderRadius: '8px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>A</span>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Artisan Corner</span>
              </div>
              <p style={{ color: colors.textSecondary, fontSize: '0.9rem', lineHeight: '1.6' }}>
                Connecting you with India's finest artisans and their handcrafted legacy. Built with love for culture. Every purchase you make directly supports a craftsman's livelihood and helps preserve a dying art form for future generations.
              </p>
            </div>

            {/* Shop Links */}
            <div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Shop</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link to="/products" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>All Products</Link></li>
                <li><Link to="/products?category=Ceramics" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>Ceramics</Link></li>
                <li><Link to="/products?category=Textiles" style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e)=>e.target.style.color=colors.primary} onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}>Textiles</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Company</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  <button 
                    onClick={() => setShowPrivacy(true)}
                    style={{ 
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      color: colors.textSecondary, fontSize: '1rem', fontFamily: 'inherit',
                      transition: 'color 0.2s'
                    }} 
                    onMouseEnter={(e)=>e.target.style.color=colors.primary} 
                    onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <a 
                    href="mailto:harshwardhansinghthakur7227@gmail.com"
                    style={{ color: colors.textSecondary, textDecoration: 'none', transition: 'color 0.2s' }} 
                    onMouseEnter={(e)=>e.target.style.color=colors.primary} 
                    onMouseLeave={(e)=>e.target.style.color=colors.textSecondary}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
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

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: colors.surface,
            width: '100%',
            maxWidth: '600px',
            maxHeight: '80vh',
            borderRadius: '16px',
            boxShadow: `0 20px 50px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)'}`,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${colors.border}`
          }}>
            {/* Modal Header */}
            <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.text }}>Privacy Policy</h2>
              <button 
                onClick={() => setShowPrivacy(false)}
                style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer', fontSize: '1.2rem' }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Scrollable Content */}
            <div style={{ padding: '24px', overflowY: 'auto', color: colors.textSecondary, lineHeight: '1.7' }}>
              <p><strong>Last Updated: February 2026</strong></p>
              <br/>
              <p>Welcome to Artisan's Corner. We value your trust and are committed to protecting your personal information.</p>
              
              <h3 style={{ color: colors.text, fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, and payment information.</p>

              <h3 style={{ color: colors.text, fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. How We Use Your Information</h3>
              <p>We use the information we collect to process your orders, communicate with you, and improve our services. We do not sell your personal data to third parties.</p>

              <h3 style={{ color: colors.text, fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

              <h3 style={{ color: colors.text, fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4. Cookies</h3>
              <p>We use cookies to enhance your browsing experience and analyze our traffic. You can choose to disable cookies through your browser settings.</p>

              <h3 style={{ color: colors.text, fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.5rem' }}>5. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us at <strong>harshwardhansinghthakur7227@gmail.com</strong>.</p>
            </div>
            
            {/* Modal Footer */}
            <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}`, textAlign: 'right' }}>
               <button 
                 onClick={() => setShowPrivacy(false)}
                 className="btn-primary"
                 style={{
                   background: colors.primary,
                   color: '#fff',
                   border: 'none',
                   padding: '10px 20px',
                   borderRadius: '8px',
                   cursor: 'pointer',
                   fontWeight: '600'
                 }}
               >
                 Close
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;