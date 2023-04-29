import { useEffect, useState } from "react";
import type { Stat } from "../customHooks/usePokemonHelpers";
import "./pokemoncard.css";
export interface PokemonCardProps {
  image: string;
  typesUrls: string[];
  baseExp: number;
  name: string;
  stats: Stat[];
}

export default function PokemonCard({
  image,
  typesUrls,
  baseExp,
  name,
  stats,
}: PokemonCardProps) {
  async function getTypes() {
    for (const url of typesUrls) {
      const result = await fetch(url);
      const jsonResult = await result.json();
      console.log(jsonResult);
    }
  }

  // useEffect(() => {
  //   getTypes();
  // }, []);
  return (
    <div className="card-container">
      <div className="info-container">
        <div className="name-types">
          <span>{name}</span>
          <div>PLACEHOLDER FOR TYPES</div>
        </div>
        <span>{baseExp}</span>
      </div>
      <img src={image} className="pokemon-image"></img>
      <div className="stats">placeholder for stats</div>
    </div>
  );
}
