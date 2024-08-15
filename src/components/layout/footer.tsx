import { Box, Paper, Divider, Typography, SxProps } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface FooterProps {
  sx?: SxProps;
}
export const Footer = ({ sx }: FooterProps) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "whitesmoke",
        textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...(sx || {}),
      }}
      elevation={6}
    >
      <Divider sx={{ width: "100%" }} />
      <Typography fontSize={12}>Developed by Luis Gerardo - 2024</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 1 }}>
        <a href="https://github.com/LuisGerar321" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
          <GitHubIcon sx={{ fontSize: 30 }} />
        </a>
        <a href="https://www.linkedin.com/in/luis-gerardo-camara-salinas321/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
          <LinkedInIcon sx={{ fontSize: 30 }} />
        </a>
      </Box>
    </Paper>
  );
};
