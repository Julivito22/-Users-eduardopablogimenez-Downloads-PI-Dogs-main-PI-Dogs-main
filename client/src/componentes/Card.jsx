import React from "react";

export default function Card({ name, image, temperaments, weight }) {
    const { imperial, metric } = weight;
  
    return (
      <div className="card">
        <img src={image.url} alt={name} weight="10px"/>
        <div className="card-content">
          <h3>{name}</h3>
          <p>Temperaments: {`${temperaments}`}</p>
          <p>Weight: {`${imperial} lbs (${metric} kg)`}</p>
        </div>
      </div>
    );
  }