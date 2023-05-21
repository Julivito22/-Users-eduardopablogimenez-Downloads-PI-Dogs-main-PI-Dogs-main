import React, { useState } from 'react';

export default function Ordenamiento({ handleOrdenAlfabetico, handleOrdenPeso }) {
  const [ordenAlfabetico, setOrdenAlfabetico] = useState('');
  const [ordenPeso, setOrdenPeso] = useState('');

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
    </div>
  );
}
