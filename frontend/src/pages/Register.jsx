import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    //debugg...
   console.log("Submitting form:", form);


    e.preventDefault();
    setLoading(true);

    try {

        //debug.....
      console.log("Sending request...");
      await axios.post('http://127.0.0.1:5000/api/auth/register', form);
      console.log("Request success");

      alert('Registered successfully! Redirecting to login...');
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
      const message = error?.response?.data?.msg || error.message || 'Registration failed';
      alert(`Registration failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        required
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}