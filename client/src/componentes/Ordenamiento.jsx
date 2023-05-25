import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { filterDogsByTemperament, filterCreated } from '../actions';
import style from '../componentes/Ordenamiento.module.css';

export default function Ordenamiento({ handleOrdenAlfabetico, handleOrdenPeso }) {
  const [ordenAlfabetico, setOrdenAlfabetico] = useState('');
  const [ordenPeso, setOrdenPeso] = useState('');
  const [temperamentos, setTemperamentos] = useState([]);
  
  const dispatch = useDispatch();
  const filteredDogs = useSelector((state) => state.filteredDogs);

  useEffect(() => {
    obtenerPerros();
  }, []);

  const obtenerPerros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/temperaments/');
      const data = response.data;
  
      const temperamentosUnicos = data.map((temperament) => temperament.name);
      setTemperamentos(temperamentosUnicos);
    } catch (error) {
      console.log('Error al obtener los perros:', error);
    }
  };

  const handleChangeOrdenAlfabetico = (event) => {
    const tipoOrden = event.target.value;
    setOrdenAlfabetico(tipoOrden);
    handleOrdenAlfabetico(tipoOrden);
  };

  const handleChangeOrdenPeso = (event) => {
    const tipoOrden = event.target.value;
    setOrdenPeso(tipoOrden);
    handleOrdenPeso(tipoOrden);
  };

  const handleFiltrarTemperamento = (temperamentoSeleccionado) => {
    dispatch(filterDogsByTemperament(temperamentoSeleccionado));
  };

  function handleFilterCreated (e){
    dispatch(filterCreated(e.target.value));
  }; 

  return (
    <div className={style.orderContainer}>
  
  <select value={ordenAlfabetico} onChange={handleChangeOrdenAlfabetico} className={style.orderSelect}>
    <option value="">A-Z</option>
    <option value="asc">Ascendente</option>
    <option value="desc">Descendente</option>
  </select>

 
  <select value={ordenPeso} onChange={handleChangeOrdenPeso} className={style.orderSelect}>
    <option value="">PESO</option>
    <option value="asc">Ascendente</option>
    <option value="desc">Descendente</option>
  </select>

  
  <select onChange={(event) => handleFiltrarTemperamento(event.target.value)} className={style.orderSelect}>
    <option value="">TEMPERAMENTOS</option>
    {temperamentos.map((temperamento, index) => (
      <option key={index} value={temperamento}>
        {temperamento}
      </option>
    ))}
  </select>
  <select onChange={handleFilterCreated} className={style.orderSelect}>
          <option value="">FILTRAR POR</option>
          <option value="created">Creados</option>
          <option value="api">Api</option>
        </select>

  {filteredDogs.length > 0 && (
    <ul>
      {filteredDogs.map((perro) => (
        <li key={perro.id}>{perro.name}</li>
      ))}
    </ul>
  )}
</div>
  );
}
