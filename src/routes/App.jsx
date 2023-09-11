import { Fragment } from 'react';
import Inicio from '../screens/Inicio';
import Home from '../screens/Home';
import Pokedex from '../screens/Pokedex';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function Path() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokedex/:pokemonId" element={<Pokedex />} />
      </Routes>
    </Fragment>
  );
}

export default Path;