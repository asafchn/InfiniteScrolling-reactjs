import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import pokemonStore from "./storedPokemons";

const combinedReducers = combineReducers({ pokemonStore });

export const store = configureStore({ reducer: combinedReducers });

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;
export const useAppDispatch: () => StoreDispatchType = useDispatch;
