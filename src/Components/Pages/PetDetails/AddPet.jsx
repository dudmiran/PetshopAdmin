import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddPet.css';

const AddPet = () => {
  const [petDetails, setPetDetails] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    category: '',
  });

  const fileInputRef = useRef(null); // Create a ref for the file input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...petDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setPetDetails({
      ...petDetails,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', petDetails.name);
    formData.append('description', petDetails.description);
    formData.append('price', petDetails.price);
    formData.append('image', petDetails.image);
    formData.append('category', petDetails.category);

    try {
      await axios.post('http://localhost:5000/api/dog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Pet added successfully!');

      // Clear the form by resetting the state
      setPetDetails({
        name: '',
        description: '',
        price: '',
        image: null,
        category: '',
      });

      // Clear the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset the file input
      }

      // Navigate to the List Pet page
      navigate('/list-pet');
    } catch (error) {
      console.error('There was an error adding the pet!', error);
    }
  };

  return (
    <div className="add-pet-container">
      <h2>Add New Pet</h2>
      <form className="add-pet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Pet Name</label>
          <input 
            type="text" 
            name="name" 
            value={petDetails.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            name="description" 
            value={petDetails.description} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            name="price" 
            value={petDetails.price} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input 
            type="file" 
            name="image" 
            onChange={handleFileChange} 
            ref={fileInputRef} // Attach the ref to the file input
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            name="category" 
            value={petDetails.category} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Reptile">Reptile</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <button type="submit" className="submit-button" >Add Pet</button>
      </form>
    </div>
  );
};

export default AddPet;
