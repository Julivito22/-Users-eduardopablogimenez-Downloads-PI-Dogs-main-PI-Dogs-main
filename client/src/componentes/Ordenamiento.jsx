import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Ordenamiento({ handleOrdenAlfabetico, handleOrdenPeso }) {
  const [ordenAlfabetico, setOrdenAlfabetico] = useState('');
  const [ordenPeso, setOrdenPeso] = useState('');
  
  const [perros, setPerros] = useState([]);
  const [temperamentos, setTemperamentos] = useState([]);

  useEffect(() => {
    obtenerPerros(); // Realiza la solicitud a la API cuando el componente se monta
  }, []);

  const obtenerPerros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/dogs/'); // Reemplaza 'URL_DE_LA_API' con la URL real de la API externa
      const data = response.data;
      setPerros(data); // Almacena los perros obtenidos de la API en el estado

      // Extrae los temperamentos únicos de los perros y almacénalos en el estado
      const temperamentosUnicos = [...new Set(data.map(perro => perro.temperament).flat())];
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
    const perrosFiltrados = perros.filter(perro => {
      const temperamento = perro.temperament;
      if (temperamento && Array.isArray(temperamento)) {
        return temperamento.includes(temperamentoSeleccionado);
      }
      return false;
    });
    // Aquí puedes hacer algo con los perros filtrados, como almacenarlos en el estado o mostrarlos en la página
    console.log(perrosFiltrados);
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
          <option key={index} value={temperamento}>{temperamento}</option>
        ))}
      </select>
    </div>
    
  );
}
