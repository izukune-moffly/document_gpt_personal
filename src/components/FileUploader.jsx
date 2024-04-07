import React, { useCallback, useRef, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const FileUploader = ({
  pdfFile,
  setPdfFile,
  handleFileChange,
  handleUpload,
}) => {
  const [dragging, setDragging] = useState(false); // ドラッグ中かどうかの状態

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false); // ドラッグ中の状態を解除
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const file = e.dataTransfer.items[0].getAsFile();
      if (file && file.type === "application/pdf") {
        handleFileChange({
          target: {
            files: [file],
          },
        });
      } else {
        alert("Please drag and drop a PDF file.");
      }
      e.dataTransfer.clearData();
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation(); // イベントバブリングを防止
    setDragging(true); // ドラッグ中の状態を設定
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation(); // イベントバブリングを防止
    setDragging(false); // ドラッグ中の状態を解除
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput" // id を追加
      />

      {/* カスタムボタン。このボタンがクリックされると、ファイル入力がトリガーされます */}
      <button onClick={() => document.getElementById("fileInput").click()}>
        ファイルを選択
      </button>
      <div
        style={{
          border: "2px dashed #cccccc",
          borderRadius: "5px",
          textAlign: "center",
          padding: "20px",
          minHeight: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: dragging ? "#f0f0f0" : "#ffffff", // 背景色の変更
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        <CloudUploadOutlinedIcon />
      </div>
      {pdfFile && <p>Selected file: {pdfFile.name}</p>}
    </div>
  );
};

export default FileUploader;
