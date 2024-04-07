import React from "react";
import styles from "./ChatList.module.css"; // ChatListのCSSモジュールをインポート
import Image from "next/image";
// import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";

function ChatList({ message, isGPT, answer_data, isLoading, isLastList }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const renderText = (text) => {
    const parts = text.split(urlRegex);

    return parts.map((part, index) =>
      urlRegex.test(part) ? (
        <a href={part} key={index} target="_blank">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={styles.container}
      style={isGPT ? null : { backgroundColor: "rgba(220, 243, 232, 0.5)" }}
    >
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {isGPT ? (
            <Image src="/ai_chara.png" width={40} height={40} alt="アイコン" />
          ) : (
            <AccountCircleIcon />
          )}
        </div>

        <div className={styles.right}>
          <div className={styles.text}>
            {(message || "回答が読み込めませんでした")
              .split("\n")
              .map((line, index) => (
                // 各行を <p> タグで囲みます
                <p key={index}>
                  <div className={styles.loading_txt}>{renderText(line)}</div>

                  {isLoading && isGPT && isLastList ? (
                    <CircularProgress />
                  ) : null}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
