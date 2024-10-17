import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
const Navbar = () => {

  const handleLogout = () => {
    // Implement your logout functionality here
    console.log('User logged out');
    // For example, clear user data from localStorage and redirect to login page
    localStorage.removeItem('token');
    window.location.href = '/'; // redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Pet Management Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
