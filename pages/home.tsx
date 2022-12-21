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
  const [text, setText] = useState("");
  const handleTextAreaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Container maxWidth={"800px"}>
      <Center h={"100vh"}>
        <VStack>
          <Textarea
            placeholder="マッチング相手に初めて送る文章を書いてください"
            value={text}
            onChange={handleTextAreaOnChange}
          ></Textarea>
        </VStack>
      </Center>
    </Container>
  );
}
