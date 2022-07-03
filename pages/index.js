import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getInfos } from "../libs/infos";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Fav from "../components/fav";

export default function Home() {
  const [url, setUrl] = useState("");
  const [favz, setFavz] = useState([]);

  useEffect(() => {
    const localFavz = JSON.parse(localStorage.getItem("favz"));
    console.log("localFavz : ", localFavz);
    if (localFavz) {
      setFavz(localFavz);
    }
  }, []);

  const handleSearchClicked = async (e) => {
    e.preventDefault();
    const infos = await getInfos(url);
    if (!infos) return console.log("error");
    infos.url = url;
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    infos.key = timestamp;
    localStorage.setItem("favz", JSON.stringify([...favz, infos]));
    setFavz([...favz, infos]);
    setUrl("");
  };

  const deleteFav = (key) => {
    console.log("delete : ", key);
    const newFavz = favz.filter((fav) => fav.key != key);
    console.log("nexFavz", newFavz);
    localStorage.setItem("favz", JSON.stringify(newFavz));
    setFavz(newFavz);
    console.log("local : ", JSON.parse(localStorage.getItem("favz")));
  };

  return (
    <Layout>
      <Head>
        <title>Favz</title>
        <meta name="description" content="Save your favorites websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <button onClick={(e) => handleSearchClicked(e)}>Search</button>
      </div>
      <section className={styles.favz}>
        {favz.map((fav) => (
          <Fav key={fav.key} fav={fav} deleteFav={deleteFav} />
        ))}
      </section>
    </Layout>
  );
}
