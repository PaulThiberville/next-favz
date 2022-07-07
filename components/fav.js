import styles from "./fav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getInfos } from "../libs/infos";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

export default function Fav({ fav, favz, setFavz }) {
  useEffect(() => {
    const resolveFav = async () => {
      console.log("resolving :", fav.url);
      const updatedFav = fav;
      const infos = await getInfos(fav.url);
      if (infos.title) updatedFav.title = infos.title;
      if (infos.description) updatedFav.description = infos.description;
      if (infos.iconUrl) updatedFav.iconUrl = infos.iconUrl;
      if (infos) {
        if (!infos.iconUrl) updatedFav.iconUrl = "";
        updatedFav.status = "complete";
        setFavz(updatedFavz(updatedFav));
        localStorage.setItem("favz", JSON.stringify(favz));
      }
    };

    const updatedFavz = (updatedFav) => {
      const newFavz = [...favz];
      newFavz.forEach((value) => {
        if (value.key === fav.key) {
          value = updatedFav;
        }
      });
      return newFavz;
    };

    if (fav.status) {
      if (fav.status === "new") {
        resolveFav();
      }
    }
  }, [fav.status, fav, favz, setFavz]);

  const deleteFav = (key) => {
    const newFavz = favz.filter((fav) => fav.key != key);
    localStorage.setItem("favz", JSON.stringify(newFavz));
    setFavz(newFavz);
  };

  return (
    <article className={styles.article}>
      <a
        className={styles.link}
        href={fav.url}
        target="_blank"
        rel="noreferrer"
      >
        {fav.status === "new" ? (
          <TailSpin color="#000000" height={50} width={50} />
        ) : (
          <img
            height={"50px"}
            width={"50px"}
            alt={fav.title}
            src={fav.iconUrl != "" ? fav.iconUrl : "/favz.png"}
          />
        )}
        <section className={styles.infos}>
          {fav.title && <h2>{fav.title}</h2>}
          {fav.description && <p>{fav.description}</p>}
          <p className={styles.url}>{fav.url}</p>
        </section>
      </a>
      <button className={styles.delete} onClick={() => deleteFav(fav.key)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  );
}
