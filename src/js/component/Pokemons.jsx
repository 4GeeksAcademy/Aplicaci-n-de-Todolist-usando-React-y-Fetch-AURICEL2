import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

export const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);

    const dataPokemons = async () => {
        if (pokemons.length > 0) return;
        
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
        const response = await fetch(url); 
        const data = await response.json();
        setPokemons(data.results);
        console.log(data);
    };

    useEffect(() => {
        dataPokemons();
    }, []);

    return (
        <div className='text-center'>
            <h1>POKEMONS</h1>
            {
                pokemons.map((pokemon, index) => (
                    <Pokemon key={index} namePokemon={pokemon.name} urlPokemon={pokemon.url}/>
                ))
            }
        </div>
    );
};

export default Pokemons;