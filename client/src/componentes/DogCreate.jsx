import React, { useState } from 'react';
import axios from 'axios';
import style from './CrearPerro.module.css'

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
      });
      
      const createdDog = response.data;
      
      
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
    </div>
  );
}