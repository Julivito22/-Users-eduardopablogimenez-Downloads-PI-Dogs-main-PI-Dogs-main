import React, { useState } from 'react';
import axios from 'axios';
import style from './CrearPerro.module.css'

export default function CrearPerroPage() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [createdDog, setCreatedDog] = useState(null); 
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/dogs/', {
        name: name,
        height: `Min: ${height.min}cm Max: ${height.max}cm`,
        weight: `Min: ${weight.min}kg Max: ${weight.max}kg`,
        life_span: life_span,
        image: image,
        temperament: temperament,
      });
      
      const createdDog = response.data;
      
      setCreatedDog(createdDog); // Guardar el perro creado en el estado
      
      console.log('Perro creado:', createdDog);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.formcontainer}>
      <h1>Crear Perro</h1>
      <form onSubmit={handleSubmit}>
        <div className={style=formfield}>
          <label htmlFor="name" className={style=formlabel}>Nombre</label>
          <input
            type="text"
            id="name"
            className={style=forminput}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre"
          />
        </div>
        <div className={style=formfield}>
          <label htmlFor="height" className={style=formlabel}>Altura</label>
          <input
            type="text"
            id="height"
            className={style=forminput}
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="Altura"
          />
        </div>
        <div className={style=formfield}>
          <label htmlFor="weight" className={style=formlabel}>Peso</label>
          <input
            type="text"
            id="weight"
            className={style=forminput}
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="Peso"
          />
        </div>
        
        <button type="submit" className={style.submitButton}>Crear Perro</button>
      </form>

      {createdDog && (
        <div className={style.createdDog}>
          <h2>Perro Creado:</h2>
          <p>Nombre: {createdDog.name}</p>
          <p>Altura: {createdDog.height}</p>
          <p>Peso: {createdDog.weight}</p>
          <p>Temperaments: {createdDog.temperament}</p>
          {/* Mostrar otros datos del perro si es necesario */}
        </div>
      )}
    </div>
  );
}







