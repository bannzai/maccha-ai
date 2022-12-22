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

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextAreaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
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

    setLoading(false);
  };

  return (
    <Container maxWidth={"800px"}>
      <Center h={"100vh"}>
        <VStack>
          <Textarea
            placeholder="マッチング相手に初めて送る文章を書いてください"
            value={message}
            onChange={handleTextAreaOnChange}
          ></Textarea>

          <Button
            colorScheme="teal"
            size="md"
            width={"100%"}
            onClick={handleOnClick}
            isLoading={loading}
          >
            送る
          </Button>
        </VStack>
      </Center>
    </Container>
  );
}
