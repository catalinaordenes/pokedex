import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const Pokedex = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
      });

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        setPokemonSpecies(data);
      });
  }, [pokemonId]);

  if (!pokemon || !pokemonSpecies) {
    return <div className="loader-container">
      <div className="ball"></div>
    </div>
  }

  const flavorTextEntries = pokemonSpecies.flavor_text_entries;
  const description = flavorTextEntries.find(entry => entry.language.name === 'en');
  const types = pokemon.types.map(typeObj => typeObj.type.name).join(', ');

  return (
    <div className='pokemon-detail'>
      <div className="card-container-detail">
        <div className="card-detail" key={pokemon.id}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="card-image-detail" />
          <div className="card-content">
            <h3 className="card-title-detail">{pokemon.name}</h3>
            <p className='number-detail'>Number: {pokemonSpecies.order}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Type: {types}</p>
            {description ? (
              <p>Description: {description.flavor_text}</p>
            ) : (
              <p>Description not available</p>
            )}
          </div>
        </div>
        <Link to="/home" className='exit'>Regresar a la página principal</Link>
      </div>
    </div>
  );
}

export default Pokedex;
