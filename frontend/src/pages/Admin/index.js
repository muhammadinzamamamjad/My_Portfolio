import React from 'react'
import { Tabs } from 'antd';
import AdminIntro from './AdminIntro'
import AdminAbout from './AdminAbout'
import AdminSkills from './AdminSkills'
import AdminProjects from './AdminProjects'
import { useNavigate } from 'react-router-dom';
function Admin({setToken, setUserRole, setRoleChecked}) {
  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); 
    navigate('/');
    setUserRole(''); 
    setRoleChecked(true); 
  };
  return (
    <div>
      <div className="flex justify-between items-center bg-primary p-5 rounded shadow mb-6">
        <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-primary px-4 py-2 rounded font-semibol transition"
        >
          Logout
        </button>
      </div>
      <div className='p-5'>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: 'Introduction',
              key: '1',
              children: <AdminIntro />,
            },
            {
              label: 'About',
              key: '2',
              children: <AdminAbout />,
            },
            {
              label: 'Skills',
              key: '3',
              children: <AdminSkills />,
            },
            {
              label: 'Projects',
              key: '4',
              children: <AdminProjects />,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Admin