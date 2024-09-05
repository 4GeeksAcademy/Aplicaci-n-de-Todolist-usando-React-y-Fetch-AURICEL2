import React, { useState, useEffect } from 'react';

export const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);

    /* esta parte del código es la responsable de hacer la solicitud inicial a la API de Pokémon, 
    obtener la lista de Pokémon y asegurarse de que esa solicitud solo se haga una vez. */
    const dataPokemons = async () => {
        if (pokemons.length > 0) return;

        const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
        const response = await fetch(url);
        const data = await response.json();

        /* Llama a la función que obtendrá los detalles de cada Pokémon
        Sin esto, solo tendrías los nombres y URLs de los Pokémon, 
        pero no podrías acceder a detalles como las imágenes o tipos sin hacer las solicitudes adicionales.*/

        /*Promise.all toma todas las promesas creadas por data.results.map (que son las solicitudes fetch a las URLs de los Pokémon)
         y espera a que todas se resuelvan antes de continuar.*/

        const pokemonDetails = await Promise.all( 

            /*Aquí recorremos (map) el array data.
            results que contiene la lista de Pokémon obtenidos de la primera llamada a la API.*/

            data.results.map(async (pokemon) => { 
                const response = await fetch(pokemon.url); // Obtener detalles del Pokémon
                const details = await response.json();
                return details; // Retorna los detalles completos, incluyendo 'sprites'
            })
        );

        setPokemons(pokemonDetails);
        console.log(pokemonDetails);
    };

    useEffect(() => {
        dataPokemons();
    }, []);

    return (
        <div className="container">
            <div className="row">
                {
                    pokemons.map((pokemon) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={pokemon.id}>
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={pokemon.sprites.front_default} className="card-img-top" alt="..." /> {/* Mostrar la imagen */}
                                <div className="card-body">
                                    <h5 className="card-title">{pokemon.name}</h5> {/* Mostrar el nombre */}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Pokemons;