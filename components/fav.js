import Head from "next/head";
import Image from "next/image";
import styles from "./fav.module.css";
import utilStyles from "../styles/utils.module.css";

export const siteTitle = "Star Wars Infos";

export default function Fav({ fav, deleteFav }) {
  return (
    <article className={styles.fav}>
      <a href={fav.url} target="_blank" rel="noreferrer">
        <img
          className={styles.img}
          alt={fav.title}
          src={
            fav.iconUrl != ""
              ? fav.iconUrl
              : "https://www.shareicon.net/data/2017/03/02/880213_star_512x512.png"
          }
        />
        <section className={styles.infos}>
          <h2>{fav.title}</h2>
          <p>{fav.description}</p>
        </section>
      </a>
      <button
        className={styles.button}
        data-key={fav.key}
        onClick={(e) => deleteFav(e.target.getAttribute("data-key"))}
      >
        X
      </button>
    </article>
  );
}
