import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({name:'', email:'', password:''});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/auth/register', form);
            alert('Registered successfully! Redirecting to login...');
            navigate('/');

        } catch (error) {
            console.error('Register error:', error);
            const message = error?.response?.data?.message || error.message || 'Registration failed';
            alert(`Registration failed: ${message}`);
        }
    };
  return (
   <form onSubmit={handleSubmit}>

    <input type="text" placeholder='Name' required
    onChange={ e => setForm({...form, name: e.target.value})} />

    <input type="email" placeholder="Email" required onChange={e => setForm({...form, email: e.target.value})} />

      <input type="password" placeholder="Password" required onChange={e => setForm({...form, password: e.target.value})} />

      <button>Register</button>
   </form>
  );
}
