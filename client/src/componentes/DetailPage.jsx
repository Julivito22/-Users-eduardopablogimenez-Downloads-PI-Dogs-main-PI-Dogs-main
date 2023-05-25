import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getDogDetail } from '../actions';
import style from './DetailPage.module.css';

export default function DetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dog = useSelector((state) => state.dogDetail);
  const createdDog = useSelector((state) => state.createdDog);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDogDetail(id)); 
  }, [dispatch, id]);

  if (!dog) {
    return <div className={style.loading}>
      <img src="/images/perrito 2.png" alt="Perrito" className={style.dog} />
    </div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={style.container}>
      <button onClick={handleGoBack} className={style.back}>VOLVER</button>
     
      <div>
      <img src={dog.url} alt={dog.name} className={style.imagen} />
      </div>
      <div className={style.text}>
        
        <h2>{dog.name}</h2>
        <p>ID:  {id}</p>
        <p>Height: {dog.height.imperial} ({dog.height.metric})</p>
<p>Weight: {dog.weight.imperial} ({dog.weight.metric})</p>
<p>Temperamentos: {dog.temperament}</p>

        
        <p>Life Span: {dog.life_span}</p>
      </div>
      {createdDog && (
        <div className={style.createdDog}>
          <h2>Perro Creado:</h2>
          <p>Nombre: {createdDog.name}</p>
          <p>Altura: {createdDog.height}</p>
          <p>Peso: {createdDog.weight}</p>
          <p>Temperamentos: {createdDog.temperament}</p>
        </div>
      )}
    </div>
  );
}
    