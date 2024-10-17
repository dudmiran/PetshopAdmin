import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [petCount, setPetCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [totalServiceRequests, setTotalServiceRequests] = useState(0);
  const [requests, setRequests] = useState({ pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const petResponse = await axios.get('http://localhost:5000/api/dog/list');
        const foodResponse = await axios.get('http://localhost:5000/api/petfeed/listfeed');

        setPetCount(petResponse?.data?.data?.length || 0);
        setFoodCount(foodResponse?.data?.data?.length || 0);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [pendingResponse, approvedResponse, rejectedResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/servicerequest/requests/Pending'),
          axios.get('http://localhost:5000/api/servicerequest/requests/Approved'),
          axios.get('http://localhost:5000/api/servicerequest/requests/Rejected')
        ]);

        const pendingCount = pendingResponse.data.length || 0;
        const approvedCount = approvedResponse.data.length || 0;
        const rejectedCount = rejectedResponse.data.length || 0;

        setRequests({
          pending: pendingCount,
          approved: approvedCount,
          rejected: rejectedCount,
        });

        // Calculate total service requests as the sum of all requests
        setTotalServiceRequests(pendingCount + approvedCount + rejectedCount);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Total Pets</h3>
        <p>{petCount}</p>
      </div>
      <div className="card">
        <h3>Total Pet Food Items</h3>
        <p>{foodCount}</p>
      </div>
      <div className="card">
        <h3>Total Service Requests</h3>
        <p>{totalServiceRequests}</p>
      </div>
      <div className="card">
        <h3>Pending Requests</h3>
        <p>{requests.pending}</p>
      </div>
      <div className="card">
        <h3>Approved Requests</h3>
        <p>{requests.approved}</p>
      </div>
      <div className="card">
        <h3>Rejected Requests</h3>
        <p>{requests.rejected}</p>
      </div>
    </div>
  );
};

export default Dashboard;
