import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // 1. Import Theme

const LoginPage = () => {
  const { colors, isDark } = useTheme(); // 2. Get Theme
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { email, password } = formData;
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

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
        background: colors.background, // Dynamic Background
        paddingTop: '100px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease'
      }}
    >
      {/* Decorative background elements (Dynamic Colors) */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(26, 58, 46, 0.08)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: isDark ? 'rgba(139, 92, 246, 0.05)' : 'rgba(201, 125, 63, 0.06)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
      `}</style>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Glass Morphism Card */}
          <div
            style={{
              background: isDark ? 'rgba(30, 27, 41, 0.7)' : 'rgba(255, 255, 255, 0.85)', // Dark/Light Glass
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '24px',
              padding: '3rem',
              boxShadow: `0 8px 32px ${colors.shadow}, 0 0 0 1px ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)'}`,
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'}`,
              transition: 'background 0.3s ease, border 0.3s ease'
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  background: colors.primary,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards'
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#fff" />
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: '0.5rem',
                  animation: 'fadeIn 0.6s ease 0.3s backwards'
                }}
              >
                Welcome Back
              </h1>
              <p
                style={{
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  animation: 'fadeIn 0.6s ease 0.4s backwards'
                }}
              >
                Sign in to continue to Artisan Corner
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ animation: 'fadeIn 0.6s ease 0.5s backwards' }}>
              
              {/* Email Field */}
              <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text,
                    marginBottom: '0.5rem'
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      transition: 'all 0.3s ease',
                      color: focusedField === 'email' ? colors.primary : colors.textSecondary
                    }}
                  >
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
                      width: '100%',
                      padding: '14px 16px 14px 48px',
                      border: `2px solid ${focusedField === 'email' ? colors.primary : colors.border}`,
                      borderRadius: '12px',
                      fontSize: '15px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      background: focusedField === 'email' ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(26, 58, 46, 0.02)') : (isDark ? 'rgba(0,0,0,0.2)' : '#fff'),
                      color: colors.text,
                      boxShadow: focusedField === 'email' ? `0 0 0 4px ${isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(44,44,44,0.08)'}` : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text,
                    marginBottom: '0.5rem'
                  }}
                >
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      transition: 'all 0.3s ease',
                      color: focusedField === 'password' ? colors.primary : colors.textSecondary
                    }}
                  >
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
                      width: '100%',
                      padding: '14px 48px 14px 48px',
                      border: `2px solid ${focusedField === 'password' ? colors.primary : colors.border}`,
                      borderRadius: '12px',
                      fontSize: '15px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      background: focusedField === 'password' ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(26, 58, 46, 0.02)') : (isDark ? 'rgba(0,0,0,0.2)' : '#fff'),
                      color: colors.text,
                      boxShadow: focusedField === 'password' ? `0 0 0 4px ${isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(44,44,44,0.08)'}` : 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.textSecondary,
                      padding: '4px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: '14px',
                    color: colors.primary,
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = colors.primaryDark)}
                  onMouseLeave={(e) => (e.target.style.color = colors.primary)}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={createRipple}
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: '600',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: isLoading ? 0.7 : 1,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid #fff',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite'
                      }}
                    />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </form>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                margin: '2rem 0'
              }}
            >
              <div style={{ flex: 1, height: '1px', background: colors.border }} />
              <span style={{ fontSize: '14px', color: colors.textSecondary }}>or</span>
              <div style={{ flex: 1, height: '1px', background: colors.border }} />
            </div>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '15px', color: colors.textSecondary }}>
                Don't have an account?{' '}
                <Link
                  to="/register"
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.color = colors.primaryDark)}
                  onMouseLeave={(e) => (e.target.style.color = colors.primary)}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <p
            style={{
              textAlign: 'center',
              fontSize: '13px',
              color: colors.textSecondary,
              marginTop: '2rem'
            }}
          >
            By signing in, you agree to our{' '}
            <Link
              to="/terms"
              style={{ color: colors.primary, textDecoration: 'none' }}
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              style={{ color: colors.primary, textDecoration: 'none' }}
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;