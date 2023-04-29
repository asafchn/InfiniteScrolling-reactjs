import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPokemonsToStore } from "../stores/storedPokemons";

export function useFetchPokemons() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const pullNumber = 6;
  function calculatePageOffset() {
    return pullNumber * page - 6;
  }
  const [loading, setLoading] = useState(true);

  async function fetchParticularPokemon(url: string) {
    const result = await fetch(url);
    const pokemon = await result.json();
    pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    return pokemon;
  }
  async function fetchAdditionalPokemons() {
    if (!loading) {
      return;
    }
    console.log("hit", page);

    setLoading(false);
    const fetchUrl = `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${calculatePageOffset()}`;
    const result = await fetch(fetchUrl);
    console.log(result);

    const resultAsJson = await result.json();
    console.log(resultAsJson);

    const pokemonsArr = [];
    for (const item of resultAsJson.results) {
      if (item.url) {
        pokemonsArr.push(await fetchParticularPokemon(item.url));
      }
    }
    setPage(page + 1);
    console.log(pokemonsArr);
    dispatch(addPokemonsToStore({ pokemons: pokemonsArr }));
  }

  return { fetchAdditionalPokemons, setLoading, loading };
}
