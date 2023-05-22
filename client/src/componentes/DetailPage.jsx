import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogDetail } from '../actions';
import style from './DetailPage.module.css';

export default function DetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dog = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [dispatch, id]);

  if (!dog) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
     
      <div>
      <img src={dog.url} alt={dog.name} className={style.imagen} />
      </div>
      <div className={style.text}>
        
        <h2>{dog.name}</h2>
        <p>ID: {dog.id}</p>
        <p>Height: {dog.height.imperial} ({dog.height.metric})</p>
<p>Weight: {dog.weight.imperial} ({dog.weight.metric})</p>
<p>Tempermentos: {dog.temperament}</p>

        
        <p>Life Span: {dog.life_span}</p>
      </div>
    </div>
  );
}
