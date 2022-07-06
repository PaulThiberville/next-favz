import Head from "next/head";
import { getInfos } from "../libs/infos";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Fav from "../components/fav";
import Styles from "../styles/index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [url, setUrl] = useState("");
  const [favz, setFavz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const localFavz = JSON.parse(localStorage.getItem("favz"));
    if (localFavz) {
      setFavz(localFavz);
    }
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSearchClicked = async (e) => {
    setError("");
    setUrl("");
    const infos = await getInfos(url);
    if (infos?.error) {
      setError(infos.error);
    }
    if (infos && !infos.error) {
      infos.url = url;
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      infos.key = timestamp;
      localStorage.setItem("favz", JSON.stringify([...favz, infos]));
      setFavz([...favz, infos]);
    }
    await delay(3000);
    setLoading(false);
  };

  const deleteFav = (key) => {
    const newFavz = favz.filter((fav) => fav.key != key);
    localStorage.setItem("favz", JSON.stringify(newFavz));
    setFavz(newFavz);
  };

  return (
    <Layout>
      <Head>
        <title>Favz</title>
        <meta name="description" content="Save your favorites websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={Styles.searchContainer}>
        <input
          className={Styles.searchBar}
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <button
          className={Styles.searchButton}
          disabled={loading || url === ""}
          onClick={async (e) => {
            setLoading(true);
            await handleSearchClicked(e);
          }}
        >
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </button>
      </div>
      <p className={Styles.error}>{error}</p>
      <section className={Styles.favz}>
        {favz.map((fav) => (
          <Fav key={fav.key} fav={fav} deleteFav={deleteFav} />
        ))}
      </section>
    </Layout>
  );
}
