import React from "react";
import { styled, useTheme } from "@mui/material/styles";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import SubBar from "./SubBar";

const Header = ({
  drawerOpen,
  handleDrawerOpen,
  handleDrawerClose,
  drawerWidth,
  modalOpen,
  handleModalOpen,
  handleModalClose,
  drawerItems,
  setDrawerItems,
  selectedThread,
  category_data,
  selectedCategory,
  setSelectedCategory,
}) => {
  const theme = useTheme();

  // styled AppBarの定義
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "drawerOpen",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(drawerOpen && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <div>
      {" "}
      <AppBar open={drawerOpen} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Multi Document GPT
          </Typography>
        </Toolbar>
        <SubBar
          modalOpen={modalOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          drawerItems={drawerItems}
          setDrawerItems={setDrawerItems}
          selectedThread={selectedThread}
          category_data={category_data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </AppBar>
    </div>
  );
};

export default Header;
