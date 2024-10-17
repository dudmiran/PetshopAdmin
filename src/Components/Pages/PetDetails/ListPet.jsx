import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListPet.css'; // Import the CSS file

const ListPet = () => {
  const [pets, setPets] = useState([]);

  // Fetch pets from the API
  const fetchPets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dog/list');
      setPets(response.data.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // Handle pet deletion
  const handleDelete = async (petId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/dog/delete`, { id: petId });
      if (response.data.success) {
        // Refresh the list after successful deletion
        fetchPets();
      } else {
        alert('Error deleting pet');
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert('Error deleting pet');
    }
  };

  return (
    <div className="pet-list">
      <h2>Pet List</h2>
      <table className="pet-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>
                <img src={`http://localhost:5000/images/${pet.image}`} alt={pet.name} className="pet-image" />
              </td>
              <td>{pet.name}</td>
              <td>{pet.description}</td>
              <td>${pet.price}</td>
              <td>{pet.category}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(pet._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPet;
