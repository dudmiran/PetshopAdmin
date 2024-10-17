import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import AddPet from './Components/Pages/PetDetails/AddPet';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import ListPet from './Components/Pages/PetDetails/ListPet';
import AddPetFood from './Components/Pages/PetFoodDetails/AddPetFood';
import ListPetFood from './Components/Pages/PetFoodDetails/ListPetFood';
import Login from './Components/Pages/Auth/Login';
import Register from './Components/Pages/Auth/Register';
import Services from './Components/Pages/Services/Services';
import Orders from './Components/Pages/Orders/Orders';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); // Update the state to reflect authentication
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <div style={{ display: 'flex' }}>
                  <Sidebar />
                  <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                    <Dashboard />
                  </div>
                </div>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/add-pet"
          element={isAuthenticated ?<>
            <Navbar />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <AddPet />
              </div>
            </div>
          </> : <Navigate to="/" />}
        />
        <Route
          path="/list-pet"
          element={isAuthenticated ? <>
            <Navbar />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <ListPet />
              </div>
            </div>
          </> : <Navigate to="/" />}
        />
        <Route
          path="/add-petfood"
          element={isAuthenticated ?<>
            <Navbar />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <AddPetFood />
              </div>
            </div>
          </> : <Navigate to="/" />}
        />
        <Route
          path="/list-petfood"
          element={isAuthenticated ?<>
            <Navbar />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <ListPetFood />
              </div>
            </div>
          </> : <Navigate to="/" />}
        />
        <Route
          path="/services"
          element={isAuthenticated ?<>
            <Navbar />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <Services />
              </div>
            </div>
          </> : <Navigate to="/" />}
        />
         <Route
          path="/orders"
          element={isAuthenticated ?<>
            <Navbar />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <Orders />
              </div>
            </div>
          </> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
