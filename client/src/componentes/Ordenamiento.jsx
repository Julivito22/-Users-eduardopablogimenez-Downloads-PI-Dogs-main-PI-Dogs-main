import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { filterDogsByTemperament } from '../actions';

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
  
      
      const temperamentosUnicos = data.map((temperamento) => temperamento.name);
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

  return (
    <div>
      <span>Ordenar por orden alfabético:</span>
      <select value={ordenAlfabetico} onChange={handleChangeOrdenAlfabetico}>
        <option value="">Seleccionar</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      <span>Ordenar por peso:</span>
      <select value={ordenPeso} onChange={handleChangeOrdenPeso}>
        <option value="">Seleccionar</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <span>Filtrar por temperamento:</span>
      <select onChange={(event) => handleFiltrarTemperamento(event.target.value)}>
        <option value="">Seleccionar</option>
        {temperamentos.map((temperamento, index) => (
          <option key={index} value={temperamento}>
            {temperamento}
          </option>
        ))}
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
