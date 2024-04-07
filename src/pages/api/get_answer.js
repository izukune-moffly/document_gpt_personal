// pages/api/get_answer.js

const get_answer = async (req, res) => {
  if (req.method === "POST") {
    const { company, category, msg } = req.body;

    try {
      // 特定のURLにPOSTリクエストを送信
      const externalApiResponse = await fetch('http://107.20.230.221:8000/get_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 必要に応じて他のヘッダーを追加
        },
        body: JSON.stringify({
          company,
          category,
          msg
        })
      });

      if (!externalApiResponse.ok) {
        throw new Error('External API error');
      }

      const externalAnswer = await externalApiResponse.json();

      // クライアントに回答を返す
      return res.status(200).json({
        status: 200,
        msg: msg,
        answer: externalAnswer.answer // 外部APIからの回答
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'サーバーエラーが発生しました。' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
};

module.exports = get_answer;

