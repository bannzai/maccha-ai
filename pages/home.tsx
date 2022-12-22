import {
  Button,
  Textarea,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  VStack,
  HStack,
  Box,
  Spacer,
  Image,
  Container,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { ScoreResponse } from "./api/score";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<Extract<
    ScoreResponse,
    { result: "success" }
  > | null>(null);
  const [error, setError] = useState<Extract<
    ScoreResponse,
    { result: "failure" }
  > | null>(null);

  const handleTextAreaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setScore(null);
  };
  const handleOnClick = async () => {
    setLoading(true);

    const response = await fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const score = (await response.json()) as ScoreResponse;
    if (score.result === "success") {
      setScore(score);
    } else {
      setError(score);
    }

    setLoading(false);
  };

  const length = Array.from(Array(score?.score.length ?? 0).keys());
  const top = Array.from(length)
    .map(() => "人")
    .join("");
  const bottom = Array.from(length)
    .map(() => "Y^")
    .join("");

  return (
    <Container width={"800px"}>
      <Center h={"100vh"}>
        <VStack>
          <Box boxSize="sm">
            <Image
              src="https://2.bp.blogspot.com/-qv_23cy1FoA/WwofU666QOI/AAAAAAABMYQ/GNr1ueRx7C8e6aHiFMOgazkIvw6rxEmYQCLcBGAs/s800/smartphone_matching_app_renai.png"
              alt="マッチング"
            />
          </Box>

          <Textarea
            placeholder="マッチング相手に初めて送る文章を書いてください"
            value={message}
            onChange={handleTextAreaOnChange}
          ></Textarea>

          <Text>
            マッチングアプリでマッチした女性へ最初に送るメッセージが 「{message}
            」の点数は100点満点中
          </Text>

          <Button
            colorScheme="teal"
            size="md"
            width={"100%"}
            onClick={handleOnClick}
            isLoading={loading}
          >
            採点する
          </Button>

          {score && (
            <VStack>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                {top}
              </Text>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                {`＞　${score.score}　＜`}
              </Text>
              <Text fontWeight={"bold"} fontSize={"2xl"}>
                {bottom}
              </Text>
            </VStack>
          )}
          {error && (
            <div>
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>リクエストに失敗しました</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            </div>
          )}
        </VStack>
      </Center>
    </Container>
  );
}
