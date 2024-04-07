import * as React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function DrawerList({ text, onClick, selected }) {
  const maxLength = 15; // 最大文字数を設定
  // テキストが maxLength を超えていたら、テキストを切り詰める
  const trimmedText =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <div>
      <ListItem
        disablePadding
        onClick={onClick}
        style={{
          border: selected ? "solid 1px #2e7d32" : "white", // 選択中のアイテムの背景色を変更
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <ChatBubbleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={trimmedText} />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default DrawerList;
