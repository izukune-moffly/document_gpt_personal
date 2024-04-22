// const ALLOWED_IP = ["35.75.48.236", "150.147.67.132"]; // 許可するIPアドレスを指定

const auth = (req, res) => {
  // クライアントのIPアドレスを取得
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // if (clientIp in ALLOWED_IP) {
  //   // 許可されていないIPアドレスからのリクエストの場合、エラーを返す
  //   return res.status(403).send({ error: "Access denied" });
  // }

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
