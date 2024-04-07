// pages/api/get_category_list.js
// import { NextApiRequest, NextApiResponse } from "next";

const get_category_list = (req, res) => {
  if (req.method === "POST") {
    console.log("get_category_list")
    const { company } = req.query;

    // データベースからカテゴリ一覧を取得するロジックをここに実装

    return res.status(200).json({
      status: 0,
      msg: "Some status detail", // 実際のメッセージに置き換える
      category_list: ["Sample Category 1", "Sample Category 2"], // 実際のカテゴリリストに置き換える
    });
  }

  return res.status(405).end(); // Method Not Allowed
};

export default get_category_list;
