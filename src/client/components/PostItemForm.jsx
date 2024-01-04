// ProductForm.jsx
import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title || ''} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description || ''} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price || ''} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
