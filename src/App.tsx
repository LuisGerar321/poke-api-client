import React, { useState } from "react";
import "./App.css";
import pokeball from "./assets/pokeball.png";
import pokemonLogo from "./assets/Pokemon-Logo.png";
import { Button, Box, TextField } from "@mui/material";
import { Footer } from "./components/layout/footer";
import { Backpack } from "./components/Backpack";
import { Pokedex } from "./components/Pokedex";
import { PokeApiProvider } from "./context/PokeApiContext";
import { createUser, signUser } from "./api/index";
import ValidateToken from "./middlewares/ValidateToken";

const sxStyle = { position: "absolute", top: 0, right: 0, width: "300px", height: "300px" };

function App() {
  const token = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(false);
  const [signInValue, setSignInValue] = useState("");
  const [signUpValue, setSignUpValue] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const handleSignIn = () => {
    signUser({ username: signInValue.toLowerCase() })
      .then((res) => {
        localStorage.setItem("token", res?.data?.token || "");
        setIsAuth(true);
        setSignInError("");
      })
      .catch((error) => {
        setSignInError(error.message);
      });
  };

  const handleSignUp = () => {
    createUser({ username: signUpValue.toLowerCase() })
      .then((res) => {
        localStorage.setItem("token", res?.data?.token || "");
        setIsAuth(true);
        setSignUpError("");
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };

  return (
    <div className="App">
      <PokeApiProvider>
        <img src={pokemonLogo} className="pokelogo" />
        <img src={pokeball} alt="Pokeball Top Left" className="pokeball top-left" />
        <Pokedex />

        {isAuth ? (
          <ValidateToken>
            <Backpack sx={sxStyle} />
          </ValidateToken>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "300px", position: "absolute", top: 10, right: 0 }}>
            <Box sx={{ mb: 2 }}>
              <TextField label="Sign In Input" variant="outlined" size="small" value={signInValue} onChange={(e) => setSignInValue(e.target.value)} error={!!signInError} helperText={signInError} />
              <Button variant="contained" onClick={handleSignIn} sx={{ ml: 2 }}>
                Sign In
              </Button>
            </Box>
            <Box>
              <TextField label="Sign Up Input" variant="outlined" size="small" value={signUpValue} onChange={(e) => setSignUpValue(e.target.value)} error={!!signUpError} helperText={signUpError} />
              <Button variant="contained" onClick={handleSignUp} sx={{ ml: 2 }}>
                Sign Up
              </Button>
            </Box>
          </Box>
        )}
        <Footer />
      </PokeApiProvider>
    </div>
  );
}

export default App;
