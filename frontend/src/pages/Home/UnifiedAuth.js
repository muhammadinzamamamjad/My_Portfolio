import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UnifiedAuth({onLogin}) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://my-portfolio-backend-6mnv.onrender.com/api/auth/login', loginData);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        if (onLogin) onLogin(res.data.token); // <-- notify parent
        const role = res.data.user.role;
        alert(`${role === 'admin' ? 'Admin' : 'User'} login successful`);
        navigate(role === 'admin' ? '/admin' : '/');
      }
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('https://my-portfolio-backend-6mnv.onrender.com/api/auth/register', registerData);
      if (res.data.success) {
        alert("User registered successfully!");
        setMode('login');
      }
    } catch (err) {
      alert("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode('login')}
            className={`px-4 py-2 font-semibold rounded-l ${mode === 'login' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`px-4 py-2 font-semibold rounded-r ${mode === 'register' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Register
          </button>
        </div>

        {mode === 'login' ? (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-3 border rounded"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-3 border rounded"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-white py-3 rounded font-semibold"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 p-3 border rounded"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-3 border rounded"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-3 border rounded"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <button
              onClick={handleRegister}
              className="w-full bg-primary text-white py-3 rounded font-semibold"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UnifiedAuth;
