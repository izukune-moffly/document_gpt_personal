import React, { useState, useEffect } from "react";
import styles from "./AddDocument.module.css";
import FileUploader from "./FileUploader";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function AddDocument({
  modalOpen,
  handleModalClose,
  selectedCompany,
  setModalOpen,
  apiEndpoint,
}) {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfCategory, setPdfCategory] = useState(null);
  const [pdfSendBtnIs, setPdfSendBtnIs] = useState(false);

  // pdfFileまたはpdfCategoryの両方が存在する場合、pdfSendBtnIsをtrueに設定
  useEffect(() => {
    if (pdfFile && pdfCategory) {
      setPdfSendBtnIs(true);
    } else {
      setPdfSendBtnIs(false);
    }
  }, [pdfFile, pdfCategory]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleUpload = async () => {
    // 必要な値が揃っているか確認
    if (!pdfFile || !selectedCompany || !pdfFile || !pdfCategory) {
      alert("全ての値を入力してください。");
      return; // 送信を中止
    }
    console.log(pdfFile);
    const formData = new FormData();
    formData.append("file", pdfFile);
    // formData.append("company", selectedCompany);
    // formData.append("category", pdfCategory);
    // formData.append("filename", pdfFile.name);
    const response = await fetch(
      `${apiEndpoint}upload_for_multi?company=${selectedCompany}&category=${pdfCategory}&filename=${pdfFile.name}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    setModalOpen(false);
    if (data.status === "0") {
      alert(`Upload successful\n${pdfCategory}`);
    } else {
      alert(
        `Upload failed\nファイル名:${pdfFile.name}\nカテゴリ:${pdfCategory}`
      );
    }
    setPdfFile(null); // pdfFileの値をリセット
  };
  return (
    <div className={styles.container}>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <div className={styles.modal_wrapper}>
          <p>ドキュメント追加</p>
          <p>ファイルを選択してください。</p>
          <FileUploader
            pdfFile={pdfFile}
            setPdfFile={setPdfFile}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
          />
          <div className={styles.bottom}>
            <TextField
              id="standard-basic"
              label="カテゴリを入力"
              variant="standard"
              className={styles.text_input}
              onChange={(e) => setPdfCategory(e.target.value)}
            />
            <Button
              variant="contained"
              disabled={pdfSendBtnIs ? false : true}
              onClick={handleUpload}
            >
              アップロード
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default AddDocument;
