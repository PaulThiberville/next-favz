import styles from "./fav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

export default function Fav({ fav, deleteFav }) {
  return (
    <article className={styles.article}>
      <a
        className={styles.link}
        href={fav.url}
        target="_blank"
        rel="noreferrer"
      >
        <img
          height={"50px"}
          width={"50px"}
          alt={fav.title}
          src={fav.iconUrl != "" ? fav.iconUrl : "/favz.png"}
        />
        <section>
          <h2>{fav.title}</h2>
          <p>{fav.description}</p>
        </section>
      </a>
      <button className={styles.delete} onClick={() => deleteFav(fav.key)}>
        <FontAwesomeIcon icon={faRemove} />
      </button>
    </article>
  );
}
