import React, { useContext, useState } from "react";
import { IPokemonProps } from "../interfaces";
import { Avatar, Box, Chip, IconButton, Snackbar, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { convertHeightToCentimeters, convertWeightToKilograms } from "../utils";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { capturePokemon } from "../api/index";
import { EPokeApiContextAction, PokeApiContext } from "../context/PokeApiContext";

export const Pokemon: React.FC<IPokemonProps> = ({ meta, sx, useSprite }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const context = useContext(PokeApiContext);

  const token = localStorage.getItem("token") || "";

  const handleFavoriteClick = (pokemon: number) => {
    capturePokemon(pokemon, token)
      .then(() => {
        setOpenSnackbar(true);
        if (context) {
          context.dispatch({ type: EPokeApiContextAction.CAPTURED });
        }
      })
      .catch((error) => {
        setOpenErrorSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Box
      sx={{
        background: "#2d39527c",
        width: 300,
        height: 120,
        borderRadius: 4,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        p: "4px",
        border: "2px solid #000",
        position: "relative",
        ...sx,
      }}
    >
      <img width="100px" height="100px" src={useSprite ?? meta.sprites.other.showdown.front_default}></img>
      <Box sx={{ background: "", display: "flex", flexDirection: "column" }}>
        <Typography fontWeight="bold" variant="h6" color="white">
          {meta.name}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: 200, height: 50 }}>
          {meta.types.map((type, index) => (
            <img src={type.sprites} key={index} width="60" height="25"></img>
          ))}
        </Box>
        <Box>
          <Chip label={`${convertWeightToKilograms(meta.weight)} kg`} color="primary"></Chip>
          <Chip label={`${convertHeightToCentimeters(meta.height)} cm`} color="secondary"></Chip>
        </Box>
      </Box>

      <IconButton
        onClick={() => {
          handleFavoriteClick(meta.id);
        }}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
        }}
      >
        <CatchingPokemonIcon fontSize="large" />
      </IconButton>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message="Pokemon Captured" />
      <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} message="Error Pokemon Captured" />
    </Box>
  );
};
