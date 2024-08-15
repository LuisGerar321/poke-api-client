import React, { useState } from "react";
import loaderPokemon from "../assets/loaderPokemon.gif";
import { Box, Modal, Typography } from "@mui/material";

interface IProps {
  open: boolean;
}
export const Loading: React.FC<IProps> = ({ open }) => {
  return (
    <Modal
      open={open}
      disableEnforceFocus
      BackdropProps={{
        style: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflow: "hidden",
          clipPath: "inset(0)",
        }}
      >
        <img style={{ animation: "slideLeft 2s infinite", userSelect: "none" }} src={loaderPokemon} alt="Loading" />
      </Box>
    </Modal>
  );
};
