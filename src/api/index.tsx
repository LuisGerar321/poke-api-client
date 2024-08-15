import axios, { AxiosResponse } from "axios";
import apiClient from "./gateway";
import { IPokemon, IResponse, IUser } from "../interfaces";

export const getPokemons = async (page = 1, pagesize = 3): Promise<IResponse<IPokemon[]>> => {
  try {
    const res: AxiosResponse<IResponse<IPokemon[]>> = await apiClient.get<IResponse<IPokemon[]>>("pokemons", {
      params: {
        page,
        pagesize,
      },
    });
    const dataResponse: IResponse<IPokemon[]> = res.data;
    return dataResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching clients:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching clients");
  }
};

export const getMyPokemons = async (token: string): Promise<IResponse<IPokemon[]>> => {
  try {
    const res: AxiosResponse<IResponse<IPokemon[]>> = await apiClient.get<IResponse<IPokemon[]>>("pokemons/self", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataResponse: IResponse<IPokemon[]> = res.data;
    return dataResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching clients:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching clients");
  }
};

export const getPokemon = async (pokemon: string): Promise<IResponse<IPokemon>> => {
  try {
    const res: AxiosResponse<IResponse<IPokemon>> = await apiClient.get<IResponse<IPokemon>>(`pokemons/${pokemon.toLocaleLowerCase()}`);

    const dataResponse: IResponse<IPokemon> = res.data;
    return dataResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching clients:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching clients");
  }
};

export const deletePokemon = async (pokemon: number, token: string): Promise<IResponse<IPokemon>> => {
  try {
    const res: AxiosResponse<IResponse<IPokemon>> = await apiClient.delete<IResponse<IPokemon>>(`pokemons/self/${pokemon}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataResponse: IResponse<IPokemon> = res.data;
    return dataResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching clients:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching clients");
  }
};

export const capturePokemon = async (pokemonId: number, token: string): Promise<IResponse<IPokemon>> => {
  try {
    const res: AxiosResponse<IResponse<IPokemon>> = await apiClient.post<IResponse<IPokemon>>(
      `pokemons/self/`,
      {
        pokemonId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const dataResponse: IResponse<IPokemon> = res.data;
    return dataResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching clients:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching clients");
  }
};

export const createUser = async (user: IUser): Promise<IResponse<IUser>> => {
  try {
    const res: AxiosResponse<IResponse<IUser>> = await apiClient.post<IResponse<IUser>>(`users`, user);
    const dataResponse: IResponse<IUser> = res.data;
    return dataResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching clients:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching clients");
  }
};

export const signUser = async (user: IUser): Promise<IResponse<IUser>> => {
  try {
    const res: AxiosResponse<IResponse<IUser>> = await apiClient.post<IResponse<IUser>>(`auth`, user);
    const dataResponse: IResponse<IUser> = res.data;
    return dataResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching clients:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Error fetching clients");
  }
};
