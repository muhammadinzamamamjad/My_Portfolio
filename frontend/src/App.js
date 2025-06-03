import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Register from './pages/Home/Register';
import Login from './pages/Home/UnifiedAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPortfolioData } from './redux/rootSlice';

function AppContent() {
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState('');
  const [roleChecked, setRoleChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getPortfolioData = async () => {
    try {
      const res = await axios.get('https://my-portfolio-backend-6mnv.onrender.com/get-portfolio-data');
      dispatch(setPortfolioData(res.data));
    } catch (error) {
      console.error('Portfolio fetch error:', error);
    }
  };

  const getUserRole = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get('https://my-portfolio-backend-6mnv.onrender.com/api/auth/verify-token', {
        headers: { Authorization: token },
      });
      setUserRole(res.data.role);

      if (res.data.role === 'admin' && location.pathname === '/') {
        navigate('/admin');
      }
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setRoleChecked(true);
    }
  };

  useEffect(() => {
    getPortfolioData();
    getUserRole();
  }, []);

  useEffect(() => {
    const onStorage = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
      if (newToken) getUserRole();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (!roleChecked) {
    return <div className="text-center mt-20 text-white">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative min-h-screen">
              <div className={token ? '' : 'filter blur-md pointer-events-none select-none'}>
                <Home
                  setToken={setToken}
                  setUserRole={setUserRole}
                  setRoleChecked={setRoleChecked}
                />
              </div>
              {!token && (location.pathname === '/') && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                  <Login onLogin={async (token) => {
                    setToken(token);
                    await getUserRole();
                  }} />
                </div>
              )}
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            token && userRole === 'admin' ? (
              <Admin                   setToken={setToken}
                  setUserRole={setUserRole}
                  setRoleChecked={setRoleChecked} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
