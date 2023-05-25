import React, { useState } from 'react';
import axios from 'axios';
import style from './CrearPerro.module.css'

export default function CrearPerroPage() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState({ minHeight: '', maxHeight: '' });
  const [weight, setWeight] = useState({ minWeight: '', maxWeight: '' });
  const [lifeSpan, setLifeSpan] = useState('');
  const [image, setImage] = useState('');
  const [temperament, setTemperament] = useState([]);

  const [createdDog, setCreatedDog] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/dogs/', {
        name: name,
        height: `Min: ${height.minHeight}cm Max: ${height.maxHeight}cm`,
        weight: `Min: ${weight.minWeight}kg Max: ${weight.maxWeight}kg`,
        life_span: lifeSpan,
        image: image,
        temperament: temperament,
      });

      const createdDog = response.data;

      setCreatedDog(createdDog);

      console.log('Perro creado:', createdDog);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.formcontainer}>
      <h1>Crear Perro</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.formfield}>
          <label htmlFor="name" className={style.formlabel}>
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className={style.forminput}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre"
          />
        </div>
        <div className={style.formfield}>
          <label htmlFor="minHeight" className={style.formlabel}>
            Altura Mínima
          </label>
          <input
            type="text"
            id="minHeight"
            className={style.forminput}
            value={height.minHeight}
            onChange={(event) =>
              setHeight((prevState) => ({
                ...prevState,
                minHeight: event.target.value,
              }))
            }
            placeholder="Altura Mínima"
          />
        </div>
        <div className={style.formfield}>
          <label htmlFor="maxHeight" className={style.formlabel}>
            Altura Máxima
          </label>
          <input
            type="text"
            id="maxHeight"
            className={style.forminput}
            value={height.maxHeight}
            onChange={(event) =>
              setHeight((prevState) => ({
                ...prevState,
                maxHeight: event.target.value,
              }))
            }
            placeholder="Altura Máxima"
          />
        </div>
        <div className={style.formfield}>
          <label htmlFor="minWeight" className={style.formlabel}>
            Peso Mínimo
          </label>
          <input
            type="text"
            id="minWeight"
            className={style.forminput}
            value={weight.minWeight}
            onChange={(event) =>
              setWeight((prevState) => ({
                ...prevState,
                minWeight: event.target.value,
              }))
            }
            placeholder="Peso Mínimo"
          />
        </div>
        <div className={style.formfield}>
          <label htmlFor="maxWeight" className={style.formlabel}>
            Peso Máximo
          </label>
          <input
            type="text"
            id="maxWeight"
            className={style.forminput}
            value={weight.maxWeight}
            onChange={(event) =>
              setWeight((prevState) => ({
                ...prevState,
                maxWeight: event.target.value,
              }))
            }
            placeholder="Peso Máximo"
          />
        </div>
        <div className={style.formfield}>
          <label htmlFor="lifeSpan" className={style.formlabel}>
            Esperanza de vida
          </label>
          <input
            type="text"
            id="lifeSpan"
            className={style.forminput}
            value={lifeSpan}
            onChange={(event) => setLifeSpan(event.target.value)}
            placeholder="Esperanza de vida"
          />
        </div>
        <div className={style.formfield}>
          <label htmlFor="image" className={style.formlabel}>
            Imagen
          </label>
          <input
            type="text"
            id="image"
            className={style.forminput}
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="file:///Users/eduardopablogimenez/Desktop/perritocreado.png"
          />
        </div>
        <div className={style.formfield}>
          <label htmlFor="temperament" className={style.formlabel}>
            Temperamento
          </label>
          <input
            type="text"
            id="temperament"
            className={style.forminput}
            value={temperament.join(', ')}
            onChange={(event) =>
              setTemperament(event.target.value.split(', '))
            }
            placeholder="Temperamento"
          />
        </div>

        <button type="submit" className={style.submitButton}>
          Crear Perro
        </button>
      </form>

      {createdDog && (
        <div className={style.createdDog}>
          <h2>Perro Creado:</h2>
          <p>Nombre: {createdDog.name}</p>
          <p>Altura: {height}</p>
          <p>Peso: {weight}</p>
          <p>Temperaments: {temperament.join(', ')}</p>
          <img src={image} alt="Perro" />
          <p className={style.successMessage}>
            ¡El perro fue creado exitosamente!
          </p>
        </div>
      )}
    </div>
  );
}








