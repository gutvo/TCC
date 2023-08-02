import { Outlet } from "react-router-dom";
import { Container, ThemeProvider, Box } from "@mui/material";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import darkTheme from "@themes/darkTheme";
import lightTheme from "@themes/lightTheme";
import { Alert } from "@components/Alert";
import { Navbar } from "@components/Navbar";
import { Footer } from "@components/Footer";

export function DefaultLayout() {
  const [theme, setTheme] = useState(false);
  const handleThemeChange = () => {
    setTheme(!theme);
  };
  const choiceTheme = theme ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={choiceTheme}>
      <Alert />
      <Navbar handleThemeChange={handleThemeChange} theme={theme} />
      <Box bgcolor={choiceTheme.palette.primary.dark}>
        <Container
          sx={{
            paddingY: "2rem",
            minHeight: "100vh",
            backgroundColor: choiceTheme.palette.primary.main,
          }}
        >
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
