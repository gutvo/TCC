import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { DrawerList } from "./Drawer";
import { blue } from "@mui/material/colors";

interface HeaderProps {
  handleThemeChange: () => void;
  theme: boolean;
}

export function Navbar({ handleThemeChange, theme }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ fontSize: "5rem" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
            onClick={toggleDrawer}
          >
            <Menu sx={{ width: "2rem", height: "2rem" }} />
          </IconButton>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
            gap={3}
          >
            <NavLink
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: blue[500],
              }}
              to="/cadastro"
            >
              Cadastrar-se
            </NavLink>
            <NavLink
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: blue[500],
              }}
              to="/login"
              color="inherit"
            >
              Login
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerList
        drawerOpen={drawerOpen}
        handleThemeChange={handleThemeChange}
        theme={theme}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  );
}
