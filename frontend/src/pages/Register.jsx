import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      alert('Registered successfully! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Register error:', error);
      const message = error?.response?.data?.msg || error.message || 'Registration failed';
      alert(`Registration failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ ...styles.panel, ...styles.leftPanel }}>
          <h1 style={styles.title}>New User</h1>
          <p style={styles.text}>Sign up to access your dashboard</p>
        </div>

        <div style={{ ...styles.panel, ...styles.rightPanel }}>
          <h1 style={styles.titleDark}>Create Account</h1>
          <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
            <input
              type="text"
              name="name"
              style={styles.input}
              placeholder="Name"
              autoComplete="off"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              name="email"
              style={styles.input}
              placeholder="Email"
              autoComplete="off"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              name="password"
              style={styles.input}
              placeholder="Password"
              autoComplete="new-password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />

            <button type="submit" style={styles.submit} disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f2f8',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  card: {
    display: 'flex',
    width: '900px',
    maxWidth: '100%',
    background: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    overflow: 'hidden'
  },
  panel: {
    flex: 1,
    padding: '40px',
    minHeight: '440px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftPanel: {
    background: 'linear-gradient(160deg, #4b6cb7, #182848)',
    color: '#fff'
  },
  rightPanel: {
    background: '#ffffff',
    color: '#222'
  },
  title: {
    color: '#fff',
    fontSize: '2rem',
    marginBottom: '12px'
  },
  titleDark: {
    color: '#222',
    fontSize: '2rem',
    marginBottom: '12px'
  },
  text: {
    color: '#fafafa',
    marginBottom: '20px',
    textAlign: 'center',
    maxWidth: '280px'
  },
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  label: {
    fontWeight: '600',
    marginBottom: '4px',
    color: '#333'
  },
  input: {
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%',
    background: '#f5f5f5',
    color: '#333'
  },
  submit: {
    marginTop: '8px',
    padding: '12px',
    backgroundColor: '#5a41ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  }
};