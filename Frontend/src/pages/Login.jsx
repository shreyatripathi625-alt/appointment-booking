import { useState } from 'react';
import API from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="logo-dot">+</div>
        <h2>Welcome back</h2>
        <p className="auth-sub">Log in to manage your appointments.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Login</button>
        </form>

        <p className="auth-switch">
          New here? <a href="/register">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
