import { SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface IResponse<T extends IPokemon | IPokemon[] | IUser> {
  status: number;
  message: string;
  data?: T;
}

export interface IMetaInfo {
  name: string;
  url: string;
  sprite?: string;
}
export interface IProps {
  children?: ReactNode;
  onDelete?: () => any;
  sx?: SxProps;
}

export interface IPokemonProps extends IProps {
  meta: IPokemon;
  useSprite?: string;
}

export interface ISprites {
  front_default: string;

  other: {
    home: {
      front_default: string;
    };
    showdown: {
      front_default: string;
    };
  };
}

export interface IPokeTypes extends IMetaInfo {
  sprites: string;
}

export interface IPokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: IPokeTypes[];
  sprites: ISprites;
}

export interface IUser {
  id?: string;
  username?: string;
  token?: string;
}
