import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListPetFood.css'; // Import the CSS file

const ListPetFood = () => {
  const [petFoods, setPetFoods] = useState([]);

  const fetchPetFoods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/petfeed/listfeed');
      setPetFoods(response.data.data);
    } catch (error) {
      console.error('Error fetching pet foods:', error);
    }
  };

  useEffect(() => {
    fetchPetFoods();
  }, []);

  const handleDelete = async (foodId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/petfeed/deletefeed', { id: foodId });
      if (response.data.success) {
        // Refresh the list after successful deletion
        fetchPetFoods();
      } else {
        alert('Error deleting pet food');
      }
    } catch (error) {
      console.error('Error deleting pet food:', error);
      alert('Error deleting pet food');
    }
  };

  return (
    <div className="pet-food-table-container">
      <h2>Pet Food List</h2>
      <table className="pet-food-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {petFoods.map((food) => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>{food.description}</td>
              <td>${food.price}</td>
              <td>
                <img src={`http://localhost:5000/images/${food.image}`} alt={food.name} className="pet-food-image" />
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(food._id)}>
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

export default ListPetFood;
