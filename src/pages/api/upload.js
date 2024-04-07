// pages/api/upload.js
// import { NextApiRequest, NextApiResponse } from "next";

const upload = (req, res) => {
  if (req.method === "POST") {
    const { company, category, filename } = req.body;

    // ファイルの保存処理などをここに実装

    return res.status(200).json({ status: 0, msg: "Successfully uploaded" });
  }

  return res.status(405).end(); // Method Not Allowed
};

export default upload;
