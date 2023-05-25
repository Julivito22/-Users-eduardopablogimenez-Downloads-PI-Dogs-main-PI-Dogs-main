import React from "react";
import style from "./Card.module.css"

export default function Card({ id, name, image, temperament, weight }) {
    const { imperial, metric } = weight;
  
    return (
      <div className={style.card} >
        <h3>{name}</h3>
        <img src={image.url} alt={name} className={style.imagen} />
        <div className={style.texto} >
          
          
          <p>Temperaments: {`${temperament}`}</p>
          <p>Weight: {`${imperial} lbs (${metric} kg)`}</p>
        </div>
      </div>
    );
  }