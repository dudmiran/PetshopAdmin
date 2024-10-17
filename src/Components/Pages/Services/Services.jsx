// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Services.css';

// const Services = () => {
//   const [serviceRequests, setServiceRequests] = useState([]);
//   const [status, setStatus] = useState('Pending');

//   useEffect(() => {
//     fetchRequestsByStatus(status);
//   }, [status]);

//   const fetchRequestsByStatus = async (status) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/servicerequest/requests/${status}`);
//       setServiceRequests(response.data);
//     } catch (error) {
//       console.error('Error fetching service requests:', error);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/servicerequest/request/${id}`, { status: newStatus });
//       console.log(response)
//       setServiceRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request._id === id ? { ...request, status: newStatus } : request
//         )
//       );
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <div className="service-request-page">
//       <h2>Service Requests</h2>
//       <div className="status-filter">
//         <label htmlFor="status">Filter by Status:</label>
//         <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//       </div>
//       <table className="service-request-table">
//         <thead>
//           <tr>
//             <th>Service</th>
//             <th>User</th>
//             <th>Status</th>
//             <th>Change Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {serviceRequests.map((request) => (
//             <tr key={request._id}>
//               <td>{request.service.name}</td>
//               <td>{request.user.name}</td>
//               <td>{request.status}</td>
//               <td>
//                 <select
//                   value={request.status}
//                   onChange={(e) => handleStatusChange(request._id, e.target.value)}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Approved">Approved</option>
//                   <option value="Rejected">Rejected</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Services;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';

const Services = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [status, setStatus] = useState('All');

  useEffect(() => {
    fetchRequestsByStatus(status);
  }, [status]);

  const fetchRequestsByStatus = async (status) => {
    try {
      const url = status === 'All' 
        ? 'http://localhost:5000/api/servicerequest/requests' 
        : `http://localhost:5000/api/servicerequest/requests/${status}`;
      const response = await axios.get(url);
      setServiceRequests(response.data);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/servicerequest/request/${id}`, { status: newStatus });
      console.log(response);
      setServiceRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="service-request-page">
      <h2>Service Requests</h2>
      <div className="status-filter">
        <label htmlFor="status">Filter by Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <table className="service-request-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.service.name}</td>
              <td>{request.user.name}</td>
              <td>{request.user.email}</td>
              <td>{request.status}</td>
              <td>
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(request._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;

