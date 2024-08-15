import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import backpack from "../assets/backpack.png";
import "../App.css";
import { Pokeball } from "./Pokeball";
import { IPokemon, IProps } from "../interfaces";
import { Pokemon } from "./Pokemon";
import { deletePokemon, getMyPokemons, getPokemons } from "../api/index";
import { PokeApiContext } from "../context/PokeApiContext";

export const Backpack: React.FC<IProps> = ({ sx }) => {
  const [open, setOpen] = useState(false);
  const [myPokemons, setMyPokemons] = useState<IPokemon[]>();
  const token = localStorage.getItem("token") || "";
  const context = useContext(PokeApiContext);

  useEffect(() => {
    getMyPokemons(token).then((res) => setMyPokemons(res.data));
  }, [open, context?.state?.captured]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDeletePokemon = useCallback((pokemon: number) => {
    deletePokemon(pokemon, token).then((res) => setMyPokemons((prev) => prev?.filter((p) => p.id != pokemon)));
  }, []);

  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <IconButton onClick={handleToggle}>
        <img src={backpack} alt="Backpack" className="pokeBack" />
      </IconButton>
      <Collapse in={open}>
        <Box mt={2}>
          {myPokemons?.map((pokemon, index) => (
            <div key={index}>
              <Pokeball
                onDelete={() => {
                  handleDeletePokemon(pokemon.id);
                }}
              >
                <Pokemon sx={{ position: "absolute", left: -320 }} meta={pokemon}></Pokemon>
              </Pokeball>
            </div>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};
