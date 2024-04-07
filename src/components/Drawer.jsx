import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AddButton from "./AddButton";
import List from "@mui/material/List";
import DrawerList from "./DrawerList";

import Profile from "./Profile";
import styles from "./Drawer.module.css";

const Drawer = ({
  drawerWidth,
  drawerOpen,
  handleDrawerClose,
  drawerItems,
  handleAddButton,
  clickThread,
  selectedThread,
}) => {
  const theme = useTheme();

  // styled drawerの定義
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <div>
      <MuiDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <AddButton onClick={handleAddButton} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className={styles.drawer_scroll}>
          <List className={styles.side_lists}>
            {drawerItems.map((item, index) => (
              <DrawerList
                key={index}
                text={item.title}
                onClick={() => {
                  clickThread(item.num);
                }}
                selected={index === selectedThread} // 選択中のアイテムかどうかを判定
              />
            ))}
          </List>
        </div>
        <Profile />
      </MuiDrawer>
    </div>
  );
};

export default Drawer;
