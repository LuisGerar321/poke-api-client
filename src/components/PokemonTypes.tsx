import { Box, Chip } from "@mui/material";
import React from "react";
import { IPokeTypes } from "../interfaces";

export interface IPokeTypesProps {
  types: IPokeTypes[];
}
export const PokemonTypes: React.FC<IPokeTypesProps> = ({ types }) => {
  return (
    <Box>
      {types.map((type, index) => (
        <Chip></Chip>
      ))}
    </Box>
  );
};
