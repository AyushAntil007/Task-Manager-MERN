import React from 'react'
import { usestate} from 'react';
import axios from 'axios';


export default function Register() {

    const [form, setForm]= useState({name:'', email:'', password:''});

    const handleSubmit = async (e)=>{
         e.preventDefault();
         await axios.post('http://localhost:5000/api/auth/register', form);

         //“Send user data (form) to backend register API and wait for response”
         
         alert("Registered!");
  };
  return (
   <form onSubmit={handleSubmit}>

    <input type="text" placeholder='Name' 
    onChange={ e => setForm({...form, name: e.target.value})} />

    <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />

      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />

      <button>Register</button>
   </form>
  );
}
