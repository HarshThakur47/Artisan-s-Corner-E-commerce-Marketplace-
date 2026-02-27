import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaTwitter, FaTimes, FaHeart, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* ADDED id="about-section" HERE */}
      <footer id="about-section" style={{ 
        marginTop: 'auto', 
        background: 'linear-gradient(to bottom, var(--surface), var(--surface-light))',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '250px', height: '250px', background: 'var(--primary)', opacity: '0.05', borderRadius: '50%', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '300px', height: '300px', background: 'var(--secondary)', opacity: '0.05', borderRadius: '50%', filter: 'blur(60px)' }} />

        <div className="container" style={{ padding: '6rem 1rem 3rem', position: 'relative', zIndex: 1 }}>
          <div className="grid-3" style={{ gap: '4rem' }}>
            
            {/* 1. Enhanced "About" Section */}
            <div>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', textDecoration: 'none' }}>
                <div style={{ 
                  width: '42px', height: '42px', 
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>A</span>
                </div>
                <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text)', letterSpacing: '-0.5px' }}>Artisan Corner</span>
              </Link>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '2rem' }}>
                We are on a mission to empower India's finest artisans. Every handcrafted piece tells a unique story of heritage, skill, and passion. Join us in preserving traditional craftsmanship for the modern world.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaMapMarkerAlt size={16} color="var(--primary)" /> <span>Chandigarh, India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaEnvelope size={16} color="var(--primary)" /> <span>hello@artisancorner.com</span>
                </div>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--text)' }}>Explore</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <Link to="/products" className="nav-link" style={{ fontSize: '1.05rem' }}>All Collection</Link>
                  <Link to="/products?category=Handmade Crafts" className="nav-link" style={{ fontSize: '1.05rem' }}>Handmade Crafts</Link>
                  <Link to="/products?category=Pottery" className="nav-link" style={{ fontSize: '1.05rem' }}>Pottery</Link>
                  <Link to="/products?category=Textiles" className="nav-link" style={{ fontSize: '1.05rem' }}>Textiles</Link>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--text)' }}>Company</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {/* Updated Link to Scroll */}
                  <button onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0', font: 'inherit', fontSize: '1.05rem' }}>Our Story</button>
                  <button onClick={() => setShowPrivacy(true)} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0', font: 'inherit', fontSize: '1.05rem' }}>Privacy Policy</button>
                  <a href="#" className="nav-link" style={{ fontSize: '1.05rem' }}>Terms of Service</a>
                </div>
              </div>
            </div>

            {/* 3. Newsletter & Social */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text)' }}>Join the Community</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Have a question or want to collaborate? Feel free to reach out to us.
              </p>
              
              <div style={{ display: 'flex', marginBottom: '2rem', boxShadow: '0 4px 12px var(--shadow)', borderRadius: '12px' }}>
                <input 
                  type="text" 
                  placeholder="Message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ flex: 1, padding: '14px 16px', borderRadius: '12px 0 0 12px', border: '1px solid var(--border)', borderRight: 'none', background: 'var(--surface)', color: 'var(--text)', outline: 'none', fontSize: '0.95rem' }} 
                />
                <a href={`mailto:harshwardhansinghthakur7227@gmail.com?subject=Contact from Artisan Corner&body=${encodeURIComponent(message)}`} className="btn-primary" style={{ width: 'auto', borderRadius: '0 12px 12px 0', padding: '14px 24px', boxShadow: 'none', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Contact</a>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', transition: 'all 0.3s ease', boxShadow: '0 4px 6px var(--shadow)' }}>
                  <FaInstagram size={20} />
                </a>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', transition: 'all 0.3s ease', boxShadow: '0 4px 6px var(--shadow)' }}>
                  <FaTwitter size={20} />
                </a>
                <a href="#" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', transition: 'all 0.3s ease', boxShadow: '0 4px 6px var(--shadow)' }}>
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '5rem', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
              © {new Date().getFullYear()} Artisan's Corner. Handcrafted with <FaHeart style={{ color: '#EF4444', display: 'inline', margin: '0 4px' }} /> in India.
            </p>
            <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s hover:text-var(--primary)' }}>Support</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s hover:text-var(--primary)' }}>FAQ</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s hover:text-var(--primary)' }}>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="animate-fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          <div className="glass-card" style={{ 
            width: '100%', 
            height: '100%', 
            maxWidth: 'none', 
            maxHeight: 'none', 
            borderRadius: '0', 
            margin: '0', 
            overflowY: 'auto', 
            padding: '4rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(var(--surface-rgb), 0.4)'
          }}>
            <div style={{ maxWidth: '800px', width: '100%', position: 'relative' }}>
              
              <button onClick={() => setShowPrivacy(false)} style={{ position: 'absolute', top: '-20px', right: '0', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)', boxShadow: '0 8px 24px var(--shadow)', zIndex: 10, transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <FaTimes size={20}/>
              </button>
              
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Privacy Policy
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Your trust is our top priority.</p>
              </div>

              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', background: 'var(--surface)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '32px', border: '1px solid var(--glass-border)', boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}>
                <h4 style={{ color: 'var(--text)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)' }}>1.</span> Data Collection
                </h4>
                <p style={{ marginBottom: '2.5rem' }}>We only collect information necessary to process your orders, such as your name, shipping address, and email. We believe in keeping a minimal data footprint to maximize your privacy and security.</p>
                <h4 style={{ color: 'var(--text)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)' }}>2.</span> Data Usage
                </h4>
                <p style={{ marginBottom: '2.5rem' }}>Your data is used solely for order fulfillment, improving your shopping experience, and customer support. We strongly oppose selling your data to third parties.</p>
                <h4 style={{ color: 'var(--text)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)' }}>3.</span> Security Measures
                </h4>
                <p style={{ marginBottom: '2rem' }}>We employ industry-standard encryption and security protocols to ensure that your personal and payment information is strictly protected from unauthorized access at all times.</p>
                <div style={{ marginTop: '4rem', textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                  <button className="btn-primary" onClick={() => setShowPrivacy(false)} style={{ width: 'auto', display: 'inline-flex', padding: '16px 48px', fontSize: '1.1rem', borderRadius: '16px' }}>
                    I Understand & Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;