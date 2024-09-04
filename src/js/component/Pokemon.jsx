import React, { useState, useEffect } from 'react';

export const Pokemon = ({ namePokemon, urlPokemon }) => {
    const [dataPokemon, setDataPokemon] = useState(null);

    const dataPokemonFetch = async () => {
        if (dataPokemon) return;

        const response = await fetch(urlPokemon);
        const data = await response.json();
        setDataPokemon(data);
        console.log(data);
    };

    useEffect(() => {
        dataPokemonFetch();
    }, [urlPokemon]);

    return (
        <div>
            <h1>{namePokemon}</h1>
            <div>
                {dataPokemon ? (
                    <img src={dataPokemon.sprites.front_default} alt={namePokemon} />
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    );
};

export default Pokemon;