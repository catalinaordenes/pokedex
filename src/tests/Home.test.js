import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Home from '../screens/Home';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mockear la función axios.get para simular la respuesta
jest.mock('axios');

test('renders Home component with data', async () => {
  const mock = new MockAdapter(axios);
  // Simular una respuesta exitosa de axios para la lista de Pokémon
  mock.onGet('https://pokeapi.co/api/v2/pokemon/').reply(200, {
    results: [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
      // Agregar más objetos de prueba según sea necesario
    ],
  });
  // Simular una respuesta exitosa de axios para la imagen del Pokémon
  mock.onGet('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png').reply(200, {
    /* Contenido de la imagen simulada */
  });

  render(<Home />);

  // Esperar a que los datos se carguen
  await waitFor(() => {
    // Verificar si se muestra un nombre de Pokémon
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    // También puedes verificar si se muestra la imagen del Pokémon
    const pokemonImage = screen.getByAltText('pikachu');
    expect(pokemonImage).toBeInTheDocument();
  });
});
