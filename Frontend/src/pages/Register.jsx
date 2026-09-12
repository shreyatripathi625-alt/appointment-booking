import { useState } from 'react';
import API from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! Please login.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="logo-dot">+</div>
        <h2>Create account</h2>
        <p className="auth-sub">Book appointments with trusted doctors.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full name</label>
            <input
              type="text"
              placeholder="Your name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>I am a</label>
            <div className="role-toggle">
              <button
                type="button"
                className={formData.role === 'patient' ? 'active' : ''}
                onClick={() => setFormData({ ...formData, role: 'patient' })}
              >
                Patient
              </button>
              <button
                type="button"
                className={formData.role === 'doctor' ? 'active' : ''}
                onClick={() => setFormData({ ...formData, role: 'doctor' })}
              >
                Doctor
              </button>
            </div>
          </div>
          <button type="submit" className="btn-submit">Create account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
