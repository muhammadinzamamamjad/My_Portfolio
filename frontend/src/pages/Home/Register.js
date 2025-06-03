import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://my-portfolio-backend-6mnv.onrender.com/api/auth/register", form);
      if (res.data.success) {
        alert("User registered successfully!");
      }
    } catch (err) {
      alert("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="p-6 bg-white max-w-md mx-auto rounded shadow">
      <h2 className="text-2xl mb-4 font-bold text-center">User Registration</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-primary text-white p-2 rounded hover:bg-tertiary transition"
      >
        Register
      </button>
    </div>
  );
}

export default Register;
