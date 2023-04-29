import { useEffect, useState } from "react";
import { useFetchPokemons } from "../customHooks/useFetchPokemons";
import { useSelector } from "react-redux";
import type { StoreState } from "../stores/mainStore";
import type { PokemonCardProps } from "../PokemonCard/PokemonCard";
import { usePokemonHelpers } from "../customHooks/usePokemonHelpers";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useRef } from "react";
import FakeCard from "../FakeCard/FakeCard";
export default function PokemonContainer() {
  const [throttleTimer, setThrottleTimer] = useState(false);
  function throttle(callback: () => void, time: number) {
    if (throttleTimer) return;
    setThrottleTimer(true);
    setTimeout(() => {
      callback();
      setThrottleTimer(false);
    }, time);
  }
  const { getTypesUrls, getStats } = usePokemonHelpers();
  const { fetchAdditionalPokemons, setLoading, loading } = useFetchPokemons();
  const containerRef = useRef(null);
  const { pokemons } = useSelector((state: StoreState) => state.pokemonStore);
  useEffect(() => {
    fetchAdditionalPokemons();
  }, []);
  useEffect(() => {
    setLoading(true);
  }, [pokemons]);
  async function handleInfiniteScroll() {
    console.log(containerRef);
    if (!containerRef.current) {
      return;
    }
    const endOfPage =
      //@ts-ignore
      window.innerHeight + window.pageYOffset >=
      //@ts-ignore
      containerRef.current.clientHeight;

    if (endOfPage) {
      await fetchAdditionalPokemons();
    }
  }
  function handleScroll() {
    throttle(handleInfiniteScroll, 500);
  }

  function generateCards() {
    const cards = [];
    for (const pokemon of pokemons) {
      const pokemonCardProp: PokemonCardProps = {
        name: pokemon.name,
        image: pokemon.image,
        baseExp: pokemon.baseExp,
        typesUrls: getTypesUrls(pokemon.types),
        stats: getStats(pokemon.stats),
      };
      cards.push(
        <PokemonCard key={pokemon.id} {...pokemonCardProp}></PokemonCard>
      );
    }

    return cards;
  }

  function generateFakeCards() {
    if (loading) {
      const arr = [];
      for (let index = 0; index < 6; index++) {
        arr.push(<FakeCard></FakeCard>);
      }
      return arr;
    } else {
      return null;
    }
  }

  return (
    <div ref={containerRef} onWheel={() => handleScroll()}>
      {generateCards()}
      {generateFakeCards()}
    </div>
  );
}
