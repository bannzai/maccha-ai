import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export type Response =
  | {
      result: "success";
      prompt: string;
      rawCompletion: string;
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
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") {
    res.status(405).json({
      result: "failure",
      message: "Only POST request allowed",
    });
    return;
  }

  const prompt = `マッチングアプリでマッチした女性へ最初に送るメッセージが「${req.body}」の場合の点数は`;
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 25,
    best_of: 1,
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
    res.status(200).json({
      result: "success",
      prompt,
      rawCompletion,
      fullText: prompt + rawCompletion,
    });
  }
}
