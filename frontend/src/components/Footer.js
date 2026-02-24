import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaTwitter, FaTimes } from 'react-icons/fa';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="grid-3" style={{ marginBottom: '3rem' }}>
            
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 'bold' }}>A</span>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Artisan Corner</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Connecting you with India's finest artisans. Every purchase supports a craftsman's livelihood.
              </p>
            </div>

            {/* Links */}
            <div className="grid-2" style={{ gap: '2rem' }}>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Shop</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link to="/products" className="nav-link">All Products</Link>
                  <Link to="/products?category=Ceramics" className="nav-link">Ceramics</Link>
                </div>
              </div>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Support</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button onClick={() => setShowPrivacy(true)} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>Privacy Policy</button>
                  <a href="mailto:support@artisancorner.com" className="nav-link">Contact Us</a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
               <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Follow Us</h3>
               <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
                 <FaGithub size={24} style={{ cursor: 'pointer' }} />
                 <FaInstagram size={24} style={{ cursor: 'pointer' }} />
                 <FaTwitter size={24} style={{ cursor: 'pointer' }} />
               </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            © 2026 Artisan's Corner. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
          <div className="glass-card" style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', margin: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2>Privacy Policy</h2>
              <button onClick={() => setShowPrivacy(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}><FaTimes size={24}/></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              At Artisan's Corner, we value your privacy. We only collect essential information needed to process your orders and improve your shopping experience. We never sell your data to third parties.
            </p>
            <button className="btn-primary" onClick={() => setShowPrivacy(false)} style={{ marginTop: '2rem' }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;