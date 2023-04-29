import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  pokemons: any[];
}
const initialState: InitialState = {
  pokemons: [],
};
const pokemonStore = createSlice({
  name: "PokemonStore",
  initialState,
  reducers: {
    addPokemonsToStore(state, action: PayloadAction<{ pokemons: any[] }>) {
      state.pokemons = [...state.pokemons, ...action.payload.pokemons];
    },
  },
});

export const { addPokemonsToStore } = pokemonStore.actions;
export default pokemonStore.reducer;
