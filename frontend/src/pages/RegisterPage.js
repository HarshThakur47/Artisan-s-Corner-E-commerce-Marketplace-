import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="page-wrapper">
      <div className="blob blob-1 animate-float"></div>
      <div className="blob blob-2 animate-float-reverse"></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }} className="animate-fade-in">
          <div className="glass-card">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '0.5rem' }}>Create Account</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Join the Artisan's Corner community</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input type="text" name="name" value={name} onChange={handleChange} className="input-field" placeholder="John Doe" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input type="email" name="email" value={email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={handleChange} className="input-field" placeholder="••••••••" style={{ paddingRight: '40px' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={confirmPassword} onChange={handleChange} className="input-field" placeholder="••••••••" style={{ paddingRight: '40px' }} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary">
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;