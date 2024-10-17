import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
