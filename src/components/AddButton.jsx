import React from "react";
// import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function AddButton({ onClick }) {
  return (
    <div style={{ width: "100%" }}>
      <Button
        variant="contained"
        onClick={onClick}
        color="primary"
        style={{
          width: "100%",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "flex-start",
          gap: "2em",
        }}
      >
        <AddIcon />
        新規作成
      </Button>
    </div>
  );
}

export default AddButton;
