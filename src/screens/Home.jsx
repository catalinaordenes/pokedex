import React, { useState, useEffect } from 'react';
import Pokemon from '../components/Pokemon';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [pokemonPerPage] = useState(30);
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url || `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonPerPage}&offset=${(currentPage - 1) * pokemonPerPage}`);
      const data = response.data;
      const pokemons = data.results;
      const favoritos = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : []

      const pokemonDataWithImages = []
      for await (const pokemon of pokemons) {
        const id = pokemon.url.split('/').slice(-2, -1)[0];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        const esFavorito = favoritos.includes(id)
        pokemonDataWithImages.push({
          id,
          name: pokemon.name,
          image: imageUrl,
          esFavorito,
        })
      }

      setPokemonData(pokemonDataWithImages);
      setTotalPages(Math.ceil(data.count / pokemonPerPage));
      setError(null);
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (name) => {
    if (name.length >= 3) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1281`)
      const data = response.data;
      const filteredData = data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())

      );
      if (filteredData.length > 0) {
        const favoritos = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : []
        const pokemonDataWithImages = []
        for await (const pokemon of filteredData) {
          const id = pokemon.url.split('/').slice(-2, -1)[0];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const esFavorito = favoritos.includes(id)
          pokemonDataWithImages.push({
            id,
            name: pokemon.name,
            image: imageUrl,
            esFavorito,
          })
        }
        setPokemonData(pokemonDataWithImages);
      } else {
        alert("Pokemones no encontrados")
        setCurrentPage(1);
        fetchData();
      }
    } else {
      if (name.length === 0) {
        setCurrentPage(1);
        fetchData();
      }
    }
  };

  const setFavorito = (pokemonId) => {
    const prevFavoritos = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : []
    const favoritoEncontrado = prevFavoritos.includes(pokemonId)
    const newFavoritos = favoritoEncontrado ? prevFavoritos.filter(e => e !== pokemonId) : [...prevFavoritos, pokemonId]
    const newPokemonData = pokemonData.map(pokemon => {
      if (pokemon.id === pokemonId) {
        return { ...pokemon, esFavorito: favoritoEncontrado ? false : true }
      } else {
        return pokemon
      }
    })
    setPokemonData(newPokemonData)
    localStorage.setItem("favoritos", JSON.stringify(newFavoritos))
  }

  const getFavoritos = async () => {
    const favoritos = localStorage.getItem("favoritos") ? JSON.parse(localStorage.getItem("favoritos")) : []
    const pokemonDataWithImages = []
    for await (const pokemonId of favoritos) {
      const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
      const esFavorito = favoritos.includes(pokemonId)
      pokemonDataWithImages.push({
        id: pokemonId,
        name: pokemonData.data.name,
        image: imageUrl,
        esFavorito,
      })
    }
    setPokemonData(pokemonDataWithImages)
  }



  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchData();
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className='home-container'>
      <Search onChange={handleSearch} />

      {isLoading ? (
        <div className="loader-container">
          <div className="ball"></div>
        </div>
      ) : (
        <>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <button className='favorite-button' onClick={() => getFavoritos()}>Mis Favoritos</button>
              <button className='all-button' onClick={() => {
                setCurrentPage(1);
                fetchData();
              }}>Ver todos</button>
              <Pokemon pokemon={searchResults.length > 0 ? searchResults : pokemonData} setFavorito={setFavorito} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={nextPage}
                onPreviousPage={previousPage}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
