import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post('http://localhost:5000/api/auth/login', form);

    localStorage.setItem('token', res.data.token);
    alert("Login Successful");
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button>Login</button>
    </form>
  );
}