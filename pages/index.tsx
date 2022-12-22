import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Home from "./home";

const inter = Inter({ subsets: ["latin"] });

export default function Root() {
  return (
    <>
      <Head>
        <title>Maccha AI</title>
        <meta
          name="description"
          content="マッチングアプリのチャットを採点します"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Home />
      </main>
    </>
  );
}
