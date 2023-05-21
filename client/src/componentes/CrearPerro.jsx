import React, { useState } from 'react';
import axios from 'axios';

export default function CrearPerroPage() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  // Otros estados para los demás campos del formulario

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/dogs/', {
        name,
        height,
        weight,
        // Otros campos del formulario
      });
      
      const createdDog = response.data;
      // Actualiza el estado o realiza otras acciones con el perro creado
      
      console.log('Perro creado:', createdDog);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Crear Perro</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
          placeholder="Altura"
        />
        <input
          type="text"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          placeholder="Peso"
        />
        {/* Otros campos del formulario */}
        <button type="submit">Crear Perro</button>
      </form>
    </div>
  );
}
