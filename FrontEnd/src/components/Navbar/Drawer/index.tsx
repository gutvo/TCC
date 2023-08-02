import { useState } from "react";
import {
  Button,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import {
  DarkMode,
  ExpandLess,
  ExpandMore,
  LightMode,
} from "@mui/icons-material";
import { ListItem } from "./ListItem";

interface navbarItensDataProps {
  path: string;
  label: string;
}

interface drawerListProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
  handleThemeChange: () => void;
  theme: boolean;
}

export function DrawerList({
  drawerOpen,
  toggleDrawer,
  handleThemeChange,
  theme,
}: drawerListProps) {
  const [openAnimalList, setOpenAnimalList] = useState(false);

  const navbarItensData: navbarItensDataProps[] = [
    {
      path: "/",
      label: "Home",
    },
    { path: "/ongs", label: "Instituições" },
    {
      path: "/chat",
      label: "Chat",
    },
  ];

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <Typography
        textAlign="center"
        fontSize="2rem"
        fontWeight="bold"
        marginTop={3}
      >
        Menu
      </Typography>
      <List
        sx={{
          width: "40vw",
          height: "100%",
          textAlign: "center",
        }}
      >
        {navbarItensData.map((item) => {
          return (
            <ListItem
              key={item.path}
              toggleDrawer={toggleDrawer}
              path={item.path}
              label={item.label}
            />
          );
        })}

        <ListItemButton
          onClick={() => {
            setOpenAnimalList(!openAnimalList);
          }}
        >
          <ListItemText
            primary="Animal"
            primaryTypographyProps={{ style: { fontSize: "1.35rem" } }}
          />
          {openAnimalList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAnimalList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              paddinLeft
              toggleDrawer={toggleDrawer}
              path="/animal/cadastrar"
              label="Cadastrar"
            />
            <ListItem
              paddinLeft
              toggleDrawer={toggleDrawer}
              path="/animal"
              label="Lista"
            />
          </List>
        </Collapse>
      </List>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Button
          sx={{ width: "80%", marginBottom: "1rem" }}
          size="large"
          variant="contained"
          onClick={handleThemeChange}
        >
          {theme ? <DarkMode /> : <LightMode />}
        </Button>
      </Box>
    </Drawer>
  );
}
