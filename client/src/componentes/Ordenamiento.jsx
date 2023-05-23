import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { filterDogsByTemperament } from '../actions';

export default function Ordenamiento({ handleOrdenAlfabetico, handleOrdenPeso }) {
  const [ordenAlfabetico, setOrdenAlfabetico] = useState('');
  const [ordenPeso, setOrdenPeso] = useState('');
  
  
  const [temperamentos, setTemperamentos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    obtenerPerros(); // Realiza la solicitud a la API cuando el componente se monta
  }, []);

  const obtenerPerros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/temperaments/'); // Reemplaza 'URL_DE_LA_API' con la URL real de la API externa
      const data = response.data;

      // Almacena los temperamentos en el estado como un objeto con propiedades 'id' y 'name'
      const temperamentosFormateados = data.map((temperamento) => ({
        id: temperamento.id,
        name: temperamento.name
      }));
      setTemperamentos(temperamentosFormateados);
    } catch (error) {
      console.log('Error al obtener los temperamentos:', error);
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
        {temperamentos.map((temperamento) => (
          <option key={temperamento.id} value={temperamento.id}>{temperamento.name}</option>
        ))}
      </select>
    </div>
  );
}
