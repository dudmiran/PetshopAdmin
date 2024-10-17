import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <List className="list">
        <ListItem
          button
          component={Link}
          to="/"
          className={`list-item ${location.pathname === '/' ? 'list-item-active' : ''}`}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/add-pet"
          className={`list-item ${location.pathname === '/add-pet' ? 'list-item-active' : ''}`}
        >
          <ListItemText primary="Add Pet" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/list-pet"
          className={`list-item ${location.pathname === '/list-pet' ? 'list-item-active' : ''}`}
        >
          <ListItemText primary="List Pet" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/add-petfood"
          className={`list-item ${location.pathname === '/add-petfood' ? 'list-item-active' : ''}`}
        >
          <ListItemText primary="Add Pet Food" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/list-petfood"
          className={`list-item ${location.pathname === '/list-petfood' ? 'list-item-active' : ''}`}
        >
          <ListItemText primary="List Pet Food" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/services"
          className={`list-item ${location.pathname === '/services' ? 'list-item-active' : ''}`}
        >
          <ListItemText primary="Service Request" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/orders"
          className={`list-item ${location.pathname === '/orders' ? 'list-item-active' : ''}`}
        >
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
