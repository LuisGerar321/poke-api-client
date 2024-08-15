import { Box, Pagination, Paper, styled } from "@mui/material";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { getPokemon, getPokemons } from "../api/index";
import { IPokemon } from "../interfaces";
import { Pokemon } from "./Pokemon";
import { Loading } from "./Loading";
import { EPokeApiContextAction, PokeApiContext, PokeApiProvider } from "../context/PokeApiContext";

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: "20px",
    backgroundColor: "#616a7c1a",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "red",
    color: "white",
  },
}));

export const Pokedex = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokemon, setPokemon] = useState<IPokemon | null>();
  const [pageApi, setPageApi] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const pageSizeApi = 60;
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;
  const totalPokemons = 1302;
  const context = useContext(PokeApiContext);
  const searchPokemon = context?.state?.pokemonSearch || "";

  useEffect(() => {
    if (searchPokemon.length > 0) {
      setLoading(true);
      getPokemon(searchPokemon)
        .then((res) => {
          setPokemon(res?.data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchPokemon]);

  useEffect(() => {
    setLoading(true);
    getPokemons(pageApi, pageSizeApi)
      .then((res) =>
        setPokemons((prev) => {
          const data = res.data || [];
          return [...prev, ...data];
        }),
      )
      .finally(() => setLoading(false));
  }, [pageApi]);

  useEffect(() => {
    if ((page + 3) * pageSize > pokemons.length) {
      setPageApi((prev) => prev + 1);
    }
  }, [page, pokemons.length]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPokemon(null);
    context?.dispatch({ type: EPokeApiContextAction.CLEAR_SEARCH });
    setPage(value);
  };

  const paginatedPokemons = pokemons?.slice((page - 1) * pageSize, page * pageSize);

  const count = Math.ceil(totalPokemons / pageSize);

  return (
    <React.Fragment>
      <SearchBar></SearchBar>
      <Paper
        sx={{
          maxWidth: "50em",
          minWidth: "50em",
          minHeight: "15em",
          m: "1em",
          background: "rgba(245, 245, 245, 0.6)",
          borderRadius: "8px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {(context?.state?.pokemonSearch?.length as number) > 0 && pokemon ? (
          <Pokemon useSprite={pokemon?.sprites?.other.home?.front_default ?? pokemon?.sprites?.front_default} meta={pokemon} sx={{ borderRadius: "0", backgroundColor: "none" }} />
        ) : (
          paginatedPokemons?.map((pokemon) => (
            <Box key={pokemon.id} sx={{ display: "flex", flexWrap: "wrap", m: 2 }}>
              <Pokemon useSprite={pokemon?.sprites?.other.home?.front_default ?? pokemon?.sprites?.front_default} meta={pokemon} sx={{ borderRadius: "0", backgroundColor: "none" }} />
            </Box>
          ))
        )}
      </Paper>
      <CustomPagination
        sx={{ height: "45px", background: "white", borderRadius: 4, bcolor: "black", fontWeight: "bold", position: "absolute", bottom: 90 }}
        count={count}
        color="secondary"
        page={page}
        onChange={handlePageChange}
      />
      <Loading open={loading}></Loading>
    </React.Fragment>
  );
};
