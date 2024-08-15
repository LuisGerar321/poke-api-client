import React, { createContext, Dispatch, useReducer } from "react";
import { IProps } from "../interfaces";

export interface IState {
  pokemonSearch: string | null;
  captured: number;
}

const initState = {
  pokemonSearch: null,
  captured: 0,
};

export enum EPokeApiContextAction {
  UPDATE_POKE_SEARCH = "update_poke_search",
  CAPTURED = "captured",
  CLEAR_SEARCH = "",
}

export interface IAction {
  type: EPokeApiContextAction;
  payload?: any;
}

export interface IPokeApiContext {
  state: IState;
  dispatch: Dispatch<IAction>;
}

export const PokeApiContext = createContext<IPokeApiContext | null>(null);

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case EPokeApiContextAction.UPDATE_POKE_SEARCH:
      return {
        ...state,
        pokemonSearch: action.payload.pokemonSearch,
      };

    case EPokeApiContextAction.CAPTURED:
      return {
        ...state,
        captured: state.captured + 1,
      };
    case EPokeApiContextAction.CLEAR_SEARCH:
      return {
        ...state,
        pokemonSearch: "",
      };
    default:
      return state;
  }
};

export const PokeApiProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return <PokeApiContext.Provider value={{ state, dispatch }}>{children}</PokeApiContext.Provider>;
};
