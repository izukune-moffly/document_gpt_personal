import React, { useState, useEffect } from "react";
import styles from "./SubBar.module.css";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function SubBar({
  modalOpen,
  handleModalOpen,
  handleModalClose,
  drawerItems,
  setDrawerItems,
  selectedThread,
  category_data,
  selectedCategory,
  setSelectedCategory,
}) {
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [threadName, setThreadName] = useState(
    drawerItems[selectedThread].title
  );
  const handleTitleChange = (e) => {
    setThreadName(e.target.value);
  };
  const clickSaveButton = () => {
    // 選択されているスレッドにテキストを追加;
    setDrawerItems((prevItems) =>
      prevItems.map((item) =>
        item.num === selectedThread ? { ...item, title: threadName } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <TextField
          id="outlined-basic"
          label="スレッド名"
          value={threadName}
          onChange={handleTitleChange}
        />
        <Button variant="contained" onClick={clickSaveButton} color="primary">
          保存
        </Button>
      </div>
      <div className={styles.right}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            カテゴリ
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedCategory}
            onChange={handleChange}
            label="category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {category_data?.category_list?.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="text" color="primary" onClick={handleModalOpen}>
          <CloudUploadIcon color="primary" fontSize="large" />
        </Button>
      </div>
    </div>
  );
}

export default SubBar;
