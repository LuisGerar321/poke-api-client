import React, { useContext, useState } from "react";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { EPokeApiContextAction, PokeApiContext } from "../context/PokeApiContext";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const context = useContext(PokeApiContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (context) context.dispatch({ type: EPokeApiContextAction.UPDATE_POKE_SEARCH, payload: { pokemonSearch: searchTerm } });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <React.Fragment>
      <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }} onSubmit={handleSubmit}>
        <InputBase onChange={handleChange} sx={{ ml: 1, flex: 1 }} placeholder="Search Pokemons!" inputProps={{ "aria-label": "search pokemons" }} />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <Box sx={{ position: "relative" }}>
            <SearchIcon sx={{ position: "absolute", top: -12, left: 15 }} />
            <CatchingPokemonIcon />
          </Box>
        </IconButton>
      </Paper>
    </React.Fragment>
  );
};

export default SearchBar;
