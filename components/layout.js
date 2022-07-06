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
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Image height={50} width={50} src="/Favz.png" alt={"Favz"}></Image>
        <h1>Favz</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Made by Paul Thiberville</footer>
    </div>
  );
}
