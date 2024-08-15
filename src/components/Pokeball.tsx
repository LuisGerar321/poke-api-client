import { Box, IconButton, Slide, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import pokeAnimation from "../assets/pokeAnimation.gif";
import pokeAnimationStaticClosed from "../assets/pokeAnimationStaticClosed.png";
import pokeAnimationStaticOpen from "../assets/pokeAnimationStaticOpen.png";
import "../App.css";
import { IProps } from "../interfaces";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const Pokeball: React.FC<IProps> = ({ children, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const imgBall = useRef<HTMLImageElement | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const handleOnClick = () => {
    if (imgBall.current) {
      if (isOpen) {
        setIsOpen(false);
        imgBall.current.src = pokeAnimationStaticClosed;
        if (timer.current !== undefined) {
          clearTimeout(timer.current);
        }
      } else {
        imgBall.current.src = pokeAnimation;

        if (timer.current !== undefined) {
          clearTimeout(timer.current);
        }

        timer.current = window.setTimeout(() => {
          if (imgBall.current) {
            imgBall.current.src = pokeAnimationStaticOpen;
            setIsOpen(true);
          }
        }, 2500);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current !== undefined) {
        clearTimeout(timer.current);
      }

      if (imgBall.current) {
        imgBall.current.src = pokeAnimationStaticOpen;
        setIsOpen(false);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ position: "relative", width: "150px", height: "150px" }}>
        <IconButton sx={{ width: "150px", height: "150px", position: "absolute" }} onClick={handleOnClick}>
          <img ref={imgBall} src={pokeAnimationStaticClosed} alt="Pokéballs" className="pokeanimation" style={{ position: "absolute", right: -80, top: -100 }} />
        </IconButton>
        <IconButton onClick={onDelete} sx={{ position: "absolute", top: -10, right: -20 }}>
          <HighlightOffIcon fontSize="large"></HighlightOffIcon>
        </IconButton>
        {isOpen && <React.Fragment>{children}</React.Fragment>}
      </Box>
    </React.Fragment>
  );
};
