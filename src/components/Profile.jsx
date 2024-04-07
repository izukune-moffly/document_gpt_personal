import * as React from "react";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import styles from "./Profile.module.css";

function Profile() {
  return (
    <div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <div>
              <ListItemText primary={"John Doe"} />
              <p className={styles.mail}>example@gmail.com</p>
            </div>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}

export default Profile;
