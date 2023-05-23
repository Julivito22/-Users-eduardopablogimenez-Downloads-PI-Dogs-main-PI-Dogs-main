import React, { useState, useEffect } from 'react';
import style from './FormPage.module.css';
import axios from 'axios';

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifespan: '',
    temperament: [],
  });

  const [errors, setErrors] = useState({});
  const [temperamentos, setTemperamentos] = useState([]);

  

  const obtenerTemperamentos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/temperaments');
      const data = response.data;
      const temperamentosAPI = data;
      const nombresTemperamentos = temperamentosAPI.map((temperamento) => temperamento.name);
      setTemperamentos(nombresTemperamentos || []);
    } catch (error) {
      console.log('Error al obtener los temperamentos:', error);
    }
  };

  useEffect(() => {
    obtenerTemperamentos();
  }, []);



  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTemperamentChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, temperament: selectedOptions });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    
    const validationErrors = {};
    
    if (!formData.name) {
      validationErrors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.minHeight) {
      validationErrors.minHeight = 'La altura mínima es obligatoria';
    }
    
    if (!formData.maxHeight) {
      validationErrors.maxHeight = 'La altura máxima es obligatoria';
    }
    
    if (!formData.minWeight) {
      validationErrors.minWeight = 'El peso mínimo es obligatorio';
    }
    
    if (!formData.maxWeight) {
      validationErrors.maxWeight = 'El peso máximo es obligatorio';
    }
    
    if (!formData.lifespan) {
      validationErrors.lifespan = 'Los años de vida son obligatorios';
    }
    
    if (formData.minWeight && formData.maxWeight && formData.minWeight > formData.maxWeight) {
      validationErrors.maxWeight = 'El peso máximo debe ser mayor o igual al peso mínimo';
    }
    

    if (Object.keys(validationErrors).length === 0) {
      
      console.log('Form submitted', formData);
    } else {
      
      setErrors(validationErrors);
    }
  };

  return (
    
    <div className={`${style.container} ${style.boldText} ${style.colorBorder}`}>
    <h1 className={`${style.container} ${style.boldText}`}>CREA TU PERRO</h1>
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.formField}>
        <label htmlFor="name" className={style.formLabel}>
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={style.formInput}
        />
        {errors.name && <p className={style.error}>{errors.name}</p>}
      </div>
      <div className={style.formField}>
        <label htmlFor="minHeight" className={style.formLabel}>
          Altura mínima:
        </label>
        <input
          type="number"
          id="minHeight"
          name="minHeight"
          value={formData.minHeight}
          onChange={handleInputChange}
          className={style.formInput}
        />
        {errors.minHeight && <p className={style.error}>{errors.minHeight}</p>}
      </div>
      <div className={style.formField}>
        <label htmlFor="maxHeight" className={style.formLabel}>
          Altura máxima:
        </label>
        <input
          type="number"
          id="maxHeight"
          name="maxHeight"
          value={formData.maxHeight}
          onChange={handleInputChange}
          className={style.formInput}
        />
        {errors.maxHeight && <p className={style.error}>{errors.maxHeight}</p>}
      </div>
      <div className={style.formField}>
        <label htmlFor="minWeight" className={style.formLabel}>
          Peso mínimo:
        </label>
        <input
          type="number"
          id="minWeight"
          name="minWeight"
          value={formData.minWeight}
          onChange={handleInputChange}
          className={style.formInput}
        />
        {errors.minWeight && <p className={style.error}>{errors.minWeight}</p>}
      </div>
      <div className={style.formField}>
        <label htmlFor="maxWeight" className={style.formLabel}>
          Peso máximo:
        </label>
        <input
          type="number"
          id="maxWeight"
          name="maxWeight"
          value={formData.maxWeight}
          onChange={handleInputChange}
          className={style.formInput}
        />
        {errors.maxWeight && <p className={style.error}>{errors.maxWeight}</p>}
      </div>
      <div className={style.formField}>
        <label htmlFor="lifespan" className={style.formLabel}>
          Años de vida:
        </label>
        <input
          type="number"
          id="lifespan"
          name="lifespan"
          value={formData.lifespan}
          onChange={handleInputChange}
          className={style.formInput}
        />
        {errors.lifespan && <p className={style.error}>{errors.lifespan}</p>}
      </div>
      <div className={style.formField}>
          <label htmlFor="temperaments" className={style.formLabel}>
            Temperamentos:
          </label>
          <select
  id="temperaments"
  name="temperaments"
  multiple
  value={formData.temperament}
  onChange={handleTemperamentChange}
  className={style.formInput}
>
  {temperamentos.map((temperamento, index) => {
    if (typeof temperamento === 'string' && temperamento.trim() !== '') {
      return (
        <option key={`${temperamento}_${index}`} value={temperamento}>
          {temperamento}
        </option>
      );
    }
    return null;
  })}
</select>

          {errors.temperament && <p className={style.error}>{errors.temperament}</p>}
        </div>
      <button type="submit" className={style.submitButton}>CREAR</button>
    </form>
  </div>
  );
}
