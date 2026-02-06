import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    const userData = { name, email, password };
    dispatch(register(userData));
  };

  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#e8e4dc',
        paddingTop: '100px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px',
        background: 'rgba(26, 58, 46, 0.08)', borderRadius: '50%', filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px',
        background: 'rgba(201, 125, 63, 0.06)', borderRadius: '50%', filter: 'blur(60px)',
        animation: 'float 6s ease-in-out infinite reverse'
      }} />

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          {/* Glass Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '24px',
            padding: '3rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.8)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{
                width: '64px', height: '64px', background: '#1a3a2e', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
              }}>
                <span style={{ color: '#e8e4dc', fontSize: '24px', fontWeight: 'bold' }}>A</span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                Create Account
              </h1>
              <p style={{ fontSize: '1rem', color: '#5a5a5a' }}>Join the Artisan's Corner community</p>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* Name Field */}
              <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                    transition: 'all 0.3s ease', color: focusedField === 'name' ? '#1a3a2e' : '#999'
                  }}>
                    <FaUser size={16} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%', padding: '14px 16px 14px 48px',
                      border: `2px solid ${focusedField === 'name' ? '#2c2c2c' : '#d4d0c8'}`,
                      borderRadius: '12px', fontSize: '15px', transition: 'all 0.3s ease',
                      outline: 'none', background: focusedField === 'name' ? 'rgba(26, 58, 46, 0.02)' : '#fff',
                      boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(44,44,44,0.08)' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                    transition: 'all 0.3s ease', color: focusedField === 'email' ? '#1a3a2e' : '#999'
                  }}>
                    <FaEnvelope size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    style={{
                      width: '100%', padding: '14px 16px 14px 48px',
                      border: `2px solid ${focusedField === 'email' ? '#2c2c2c' : '#d4d0c8'}`,
                      borderRadius: '12px', fontSize: '15px', transition: 'all 0.3s ease',
                      outline: 'none', background: focusedField === 'email' ? 'rgba(26, 58, 46, 0.02)' : '#fff',
                      boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(44,44,44,0.08)' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                    transition: 'all 0.3s ease', color: focusedField === 'password' ? '#1a3a2e' : '#999'
                  }}>
                    <FaLock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your password"
                    style={{
                      width: '100%', padding: '14px 48px 14px 48px',
                      border: `2px solid ${focusedField === 'password' ? '#2c2c2c' : '#d4d0c8'}`,
                      borderRadius: '12px', fontSize: '15px', transition: 'all 0.3s ease',
                      outline: 'none', background: focusedField === 'password' ? 'rgba(26, 58, 46, 0.02)' : '#fff',
                      boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(44,44,44,0.08)' : 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                      background: 'transparent', border: 'none', cursor: 'pointer', color: '#999',
                    }}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                    transition: 'all 0.3s ease', color: focusedField === 'confirmPassword' ? '#1a3a2e' : '#999'
                  }}>
                    <FaLock size={16} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirm your password"
                    style={{
                      width: '100%', padding: '14px 48px 14px 48px',
                      border: `2px solid ${focusedField === 'confirmPassword' ? '#2c2c2c' : '#d4d0c8'}`,
                      borderRadius: '12px', fontSize: '15px', transition: 'all 0.3s ease',
                      outline: 'none', background: focusedField === 'confirmPassword' ? 'rgba(26, 58, 46, 0.02)' : '#fff',
                      boxShadow: focusedField === 'confirmPassword' ? '0 0 0 4px rgba(44,44,44,0.08)' : 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                      background: 'transparent', border: 'none', cursor: 'pointer', color: '#999',
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={createRipple}
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%', padding: '16px', fontSize: '16px', fontWeight: '600',
                  position: 'relative', overflow: 'hidden', opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{
                      width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite'
                    }} />
                    Creating Account...
                  </div>
                ) : 'Create Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ fontSize: '15px', color: '#5a5a5a' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1a3a2e', fontWeight: '600', textDecoration: 'none' }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;