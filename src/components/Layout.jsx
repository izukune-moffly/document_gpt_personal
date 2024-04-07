import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AddDocument from "./AddDocument";
import Header from "./Header";
import Drawer from "./Drawer";
import Main from "./Main";

const drawerWidth = 240;

// fetcher関数を設定します。
const fetcher = (url) => fetch(url).then((res) => res.json());
// POST リクエスト用のフェッチャー関数
const postFetcher = (url, data) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        // レスポンスがokではない場合、エラーをスロー
        throw new Error("サーバーからのエラーレスポンス: " + res.status);
      }
      return res.json();
    })
    .catch((error) => {
      // ネットワークエラーやサーバーエラーの場合、ここが実行される
      // alert("エラーが発生しました: " + error.message);
    });

export default function PersistentDrawerLeft() {
  // テーマ
  const theme = useTheme();

  // ドロワー項目の状態と関数
  // - スレッド用の配列の中にオブジェクトとしてスレッドタイトル、チャット内容の配列を定義
  const [drawerItems, setDrawerItems] = useState([
    { num: 0, title: "chat 0", chat: [] },
  ]);
  const [threadNum, setThreadNum] = useState(1);
  const [selectedThread, setSelectedThread] = useState(0);

  // ドロワーの表示管理
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // モーダルの表示管理
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  // 会社とカテゴリの状態とAPIからの取得
  // - 会社名を初期化
  const [selectedCompany, setSelectedCompany] = useState(
    process.env.NEXT_PUBLIC_COMPANY
  );
  // エンドポイントの初期化
  const [apiEndpoint, setApiEndpoint] = useState(
    process.env.NEXT_PUBLIC_API_URL
  );

  // - APIでカテゴリデータの取得
  const { data: category_data, category_error } = useSWR(
    selectedCompany
      ? `${apiEndpoint}get_category_list_multi_docs?company=${selectedCompany}`
      : null,
    postFetcher
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  // 新規作成ボタンがクリックされたときのハンドラ
  const handleAddButton = () => {
    const newItem = {
      num: threadNum,
      title: `new chat ${threadNum}`,
      chat: [],
    };
    setDrawerItems((prevDrawerItems) => [...prevDrawerItems, newItem]);
    setSelectedThread(threadNum);
    setThreadNum(threadNum + 1);
  };

  // ドロワー項目をクリックしたときの関数
  const clickThread = (index) => {
    setSelectedThread(index);
  };

  // 選択中のスレッドをコンソールに表示する（確認用）
  useEffect(() => {
    console.log(`選択中のスレッド${selectedThread}`);
    console.log(drawerItems[selectedThread]);

    console.log(`選択中のカテゴリ${selectedThread}`);
    console.log(selectedCategory);
  }, [selectedThread, selectedCategory]); // selectedThreadが変更された時にこのeffectが実行される

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* ヘッダーとその下のサブバー */}
        <Header
          drawerOpen={drawerOpen}
          handleDrawerOpen={handleDrawerOpen}
          drawerWidth={drawerWidth}
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

        {/* サイドバー、スレッド一覧 */}
        <Drawer
          drawerWidth={drawerWidth}
          drawerOpen={drawerOpen}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
          drawerItems={drawerItems}
          handleAddButton={handleAddButton}
          clickThread={clickThread}
          selectedThread={selectedThread}
        />

        {/* トークルームと送信フォーム */}
        <Main
          drawerOpen={drawerOpen}
          drawerWidth={drawerWidth}
          drawerItems={drawerItems}
          setDrawerItems={setDrawerItems}
          selectedThread={selectedThread}
          setSelectedThread={setSelectedThread}
          selectedCategory={selectedCategory}
          selectedCompany={selectedCompany}
          apiEndpoint={apiEndpoint}
        />

        {/* pdfアップロード用のモーダル */}
        <AddDocument
          modalOpen={modalOpen}
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
          selectedCompany={selectedCompany}
          selectedCategory={selectedCategory}
          setModalOpen={setModalOpen}
          apiEndpoint={apiEndpoint}
        />
      </Box>
    </div>
  );
}
