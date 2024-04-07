import React, { useState, useEffect } from "react";
// import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Message.module.css";

function Message({ handleSubmit, selectedCategory, isLoading }) {
  const [text, setText] = useState("");
  const [textSendBtnIs, setTextSendBtnIs] = useState(false);

  // textが存在する場合、messageSendBtnIsをtrueに設定
  useEffect(() => {
    if (text) {
      setTextSendBtnIs(true);
    } else {
      setTextSendBtnIs(false);
    }
  }, [text]);
  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e, text, setText)}
        className={styles.form}
      >
        <TextField
          label={
            selectedCategory ? "メッセージを入力" : "カテゴリを選択してください"
          }
          variant="outlined"
          multiline // 複数行の入力を許可
          maxRows={4}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!selectedCategory} // selectedCategoryが空または未定義の場合に無効にする
          color="success"
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          className={styles.btn}
          disabled={textSendBtnIs && !isLoading ? false : true}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Message;
