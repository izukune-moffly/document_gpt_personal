// pages/api/auth.js
const auth = (req, res) => {
  if (req.method === "POST") {
    const { password } = req.body;
    if (password === process.env.SECRET_PASSWORD) {
      // 正しいパスワードが入力された場合
      res.status(200).send({ authenticated: true });
    } else {
      // 誤ったパスワードが入力された場合
      res.status(401).send({ authenticated: false });
    }
  } else {
    // POSTメソッド以外のリクエストは許可しない
    res.status(405).end();
  }
};

export default auth;
