import React, { useState } from 'react';

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifespan: '',
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTemperamentChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, temperaments: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = {};
    // Validate name field
    if (!formData.name) {
      validationErrors.name = 'El nombre es obligatorio';
    }
    // Validate minHeight field
    if (!formData.minHeight) {
      validationErrors.minHeight = 'La altura mínima es obligatoria';
    }
    // Validate maxHeight field
    if (!formData.maxHeight) {
      validationErrors.maxHeight = 'La altura máxima es obligatoria';
    }
    // Validate minWeight field
    if (!formData.minWeight) {
      validationErrors.minWeight = 'El peso mínimo es obligatorio';
    }
    // Validate maxWeight field
    if (!formData.maxWeight) {
      validationErrors.maxWeight = 'El peso máximo es obligatorio';
    }
    // Validate lifespan field
    if (!formData.lifespan) {
      validationErrors.lifespan = 'Los años de vida son obligatorios';
    }
    // Validate minWeight and maxWeight values
    if (formData.minWeight && formData.maxWeight && formData.minWeight > formData.maxWeight) {
      validationErrors.maxWeight = 'El peso máximo debe ser mayor o igual al peso mínimo';
    }
    // Add more validation rules if needed

    if (Object.keys(validationErrors).length === 0) {
      // Submit the form and create the new breed
      // Add your logic here to send the form data to the backend and create a new breed
      console.log('Form submitted', formData);
    } else {
      // Display validation errors
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="minHeight">Altura mínima:</label>
          <input
            type="number"
            id="minHeight"
            name="minHeight"
            value={formData.minHeight}
            onChange={handleInputChange}
          />
          {errors.minHeight && <p className="error">{errors.minHeight}</p>}
        </div>
        <div>
          <label htmlFor="maxHeight">Altura máxima:</label>
          <input
            type="number"
            id="maxHeight"
            name="maxHeight"
            value={formData.maxHeight}
            onChange={handleInputChange}
          />
          {errors.maxHeight && <p className="error">{errors.maxHeight}</p>}
        </div>
        <div>
          <label htmlFor="minWeight">Peso mínimo:</label>
          <input
            type="number"
            id="minWeight"
            name="minWeight"
            value={formData.minWeight}
            onChange={handleInputChange}
          />
          {errors.minWeight && <p className="error">{errors.minWeight}</p>}
        </div>
        <div>
          <label htmlFor="maxWeight">Peso máximo:</label>
          <input
            type="number"
            id="maxWeight"
            name="maxWeight"
            value={formData.maxWeight}
            onChange={handleInputChange}
          />
          {errors.maxWeight && <p className="error">{errors.maxWeight}</p>}
        </div>
        <div>
          <label htmlFor="lifespan">Años de vida:</label>
          <input type="number" id="lifespan" name="lifespan" value={formData.lifespan} onChange={handleInputChange} />
          {errors.lifespan && <p className="error">{errors.lifespan}</p>}
        </div>
        <div>
          <label htmlFor="temperaments">Temperamentos:</label>
          <select
            id="temperaments"
            name="temperaments"
            multiple
            value={formData.temperaments}
            onChange={handleTemperamentChange}
          >
            <option value="temperament1">Temperamento 1</option>
            <option value="temperament2">Temperamento 2</option>
            <option value="temperament3">Temperamento 3</option>
            {/* ... other options */}
          </select>
          {errors.temperaments && <p className="error">{errors.temperaments}</p>}
        </div>
        <button type="submit">Crear raza</button>
      </form>
    </div>
  );
}
