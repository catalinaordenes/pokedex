import React from 'react';
import { useNavigate } from 'react-router-dom'


const Pokemon = ({ pokemon, setFavorito }) => {
  const navigate = useNavigate()
  return (
    <div className='Pokemon'>
      <div className="card-container">
        {pokemon.map(pokemon => (
          <div className="card">
            <h3 className='number'>{pokemon.id}</h3>
            <button onClick={() => setFavorito(pokemon.id)} className='favorite'>{pokemon.esFavorito ? <i class="material-icons">favorite</i> : <i class="material-icons">favorite_border</i>}</button>
            <img onClick={() => { navigate(`/pokedex/${pokemon.id}`) }} src={pokemon.image} alt={pokemon.name} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{pokemon.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
