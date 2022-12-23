import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export type ScoreResponse =
  | {
      result: "success";
      prompt: string;
      rawCompletion: string;
      score: string;
      fullText: string;
    }
  | {
      result: "failure";
      message: string;
      extension?: {
        body: any;
        prompt: string;
        rawCompletion?: string;
      };
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScoreResponse>
) {
  if (req.method !== "POST") {
    res.status(405).json({
      result: "failure",
      message: "Only POST request allowed",
    });
    return;
  }

  const { message } = req.body;
  const prompt = `マッチングアプリでマッチした相手へ最初に送るメッセージが「${message}」の点数は100点満点中`;
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    temperature: Math.random(),
    prompt,
    max_tokens: 10,
    stop: "点",
    suffix: "点です！",
  });
  const rawCompletion = completion.data.choices[0].text;

  if (rawCompletion == null) {
    res.status(500).json({
      result: "failure",
      message: "採点に失敗しました。もう一度やり直してください",
      extension: {
        body: req.body,
        prompt,
        rawCompletion,
      },
    });
  } else {
    const score = rawCompletion + "点です！";
    const fullText = prompt + score;

    console.log({ fullText });

    res.status(200).json({
      result: "success",
      prompt,
      score,
      rawCompletion,
      fullText,
    });
  }
}
