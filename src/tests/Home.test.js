import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Home from '../screens/Home';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


jest.mock('axios');

test('renders Home component with data', async () => {
  const mock = new MockAdapter(axios);
  
  mock.onGet('https://pokeapi.co/api/v2/pokemon/').reply(200, {
    results: [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    
    ],
  });

  mock.onGet('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png').reply(200, {

  });

  render(<Home />);


  await waitFor(() => {

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

 
    const pokemonImage = screen.getByAltText('pikachu');
    expect(pokemonImage).toBeInTheDocument();
  });
});
