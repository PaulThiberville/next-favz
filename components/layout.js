import Head from "next/head";
import styles from "./layout.module.css";
import Image from "next/dist/client/image";
export const siteTitle = "Favz";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favz.ico" />
        <meta name="description" content="Create customized bookmarks" />
        <meta property="og:image" content="https://ibb.co/3FhNNfn" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Image height={50} width={50} src="/favz.png" alt={"Favz"}></Image>
        <h1>Favz</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Made by Paul Thiberville</footer>
    </div>
  );
}
