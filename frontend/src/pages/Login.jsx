import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
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
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" required onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" required onChange={e => setForm({...form, password: e.target.value})} />
      <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
}