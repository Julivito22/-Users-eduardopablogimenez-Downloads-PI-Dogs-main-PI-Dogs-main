import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  test('renders card with correct information', () => {
    const name = 'Labrador Retriever';
    const image = { url: 'https://cdn2.thedogapi.com/images/B1uW7l5VX_1280.jpg' };
    const temperament = ['Kind', 'Outgoing', 'Agile'];
    const weight = { imperial: '55 - 80', metric: '25 - 36' };
    
    render(
      <Card
        name={name}
        image={image}
        temperament={temperament}
        weight={weight}
      />
    );
    
    const cardNameElement = screen.getByText(name);
    expect(cardNameElement).toBeInTheDocument();
    
    const cardImageElement = screen.getByAltText(name);
    expect(cardImageElement).toBeInTheDocument();
    expect(cardImageElement).toHaveAttribute('src', image.url);
    
    const cardTemperamentElement = screen.getByText(`Temperaments: ${temperament.join(', ')}`);
    expect(cardTemperamentElement).toBeInTheDocument();
    
    const cardWeightElement = screen.getByText(`Weight: ${weight.imperial} lbs (${weight.metric} kg)`);
    expect(cardWeightElement).toBeInTheDocument();
  });
});