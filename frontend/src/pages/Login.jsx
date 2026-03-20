import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert("Login Successful");
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
      const message = error?.response?.data?.msg || error.message || 'Login failed';
      alert(`Login failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={{ ...styles.panel, ...styles.leftPanel }}>
          <h1 style={styles.title}>Welcome Back!</h1>
          <p style={styles.text}>Enter your personal details to use all site features</p>
        </div>

        <div style={{ ...styles.panel, ...styles.rightPanel }}>
          <h1 style={styles.titleDark}>Sign In</h1>
          <form onSubmit={handleLogin} autoComplete="off" style={styles.form}>
            <input
              type="email"
              name="email"
              autoComplete="off"
              style={styles.input}
              placeholder="Email"
              required
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />

            <input
              type="password"
              name="password"
              autoComplete="new-password"
              style={styles.input}
              placeholder="Password"
              required
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
            />

            <button type="submit" style={styles.submit} disabled={loading}>
              {loading ? 'Logging in...' : 'Sign In'}
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