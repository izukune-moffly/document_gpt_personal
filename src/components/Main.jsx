import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Divider from "@mui/material/Divider";
import Message from "./Message";
import ChatList from "./ChatList";
import styles from "./Main.module.css";

const Main = ({
  drawerOpen,
  drawerWidth,
  drawerItems,
  setDrawerItems,
  selectedThread,
  setSelectedThread,
  selectedCategory,
  selectedCompany,
  apiEndpoint,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e, text, setText) => {
    e.preventDefault();

    // ユーザーのテキストを追加
    setDrawerItems((prevItems) =>
      prevItems.map((item) =>
        item.num === selectedThread
          ? { ...item, chat: [...item.chat, text] }
          : item
      )
    );

    // テキストフィールドをクリア
    setText("");

    // Add loading message with animation
    setDrawerItems((prevItems) =>
      prevItems.map((item) =>
        item.num === selectedThread
          ? { ...item, chat: [...item.chat, "loading..."] }
          : item
      )
    );
    setIsLoading(true);

    const requestBody = {
      company: selectedCompany,
      category: selectedCategory,
      msg: text,
    };

    const response = await fetch(
      `${apiEndpoint}get_answer_from_multi?company=${selectedCompany}&category=${selectedCategory}&msg=${text}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const answerData = await response.json();
    setIsLoading(false); // Set isLoading to false before outputting answerData

    // ローディングメッセージを削除し、APIの応答を追加
    setDrawerItems((prevItems) =>
      prevItems.map((item) => {
        if (item.num === selectedThread) {
          const updatedChat = item.chat;
          updatedChat.pop(); // ローディングメッセージを削除
          return { ...item, chat: [...updatedChat, answerData.answer] };
        }
        return item;
      })
    );
  };

  return (
    <div className={styles.container_wrapper}>
      <main className={`${styles.main} ${drawerOpen ? styles.open : ""}`}>
        <div className={styles.talkRoom}>
          {drawerItems[selectedThread].chat.map((text, index, array) => (
            <div key={index}>
              <ChatList
                message={text}
                isGPT={index % 2 === 0 ? false : true}
                isLoading={isLoading}
                isLastList={index === array.length - 1}
              />
              <Divider />
            </div>
          ))}
        </div>

        <Message
          className={styles.message_container}
          handleSubmit={handleSubmit}
          selectedCategory={selectedCategory}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Main;
