import React, { useState, useRef } from 'react';
import axios from 'axios';
import './AddPetFood.css';

const AddPetFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('image', formData.image);

    try {
      await axios.post('http://localhost:5000/api/petfeed/addfeed', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Pet food added successfully!');

      // Clear the form after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        image: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input field
      }
    } catch (error) {
      console.error('Error adding pet food:', error);
    }
  };

  return (
    <div className="add-pet-food">
      <h2>Add Pet Food</h2>
      <form onSubmit={handleSubmit} className="pet-food-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
            ref={fileInputRef} // Attach the ref to the file input
            required
          />
        </label>
        <button type="submit">Add Pet Food</button>
      </form>
    </div>
  );
};

export default AddPetFood;

