import Head from "next/head";
import { getInfos } from "../libs/infos";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Fav from "../components/fav";
import Styles from "../styles/index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [url, setUrl] = useState("");
  const [favz, setFavz] = useState([]);
  const [revertedFavz, setRevertedFavz] = useState([]);

  useEffect(() => {
    const localFavz = JSON.parse(localStorage.getItem("favz"));
    console.log("local Favz :", localFavz);
    if (localFavz) {
      setFavz(localFavz);
    }
  }, []);

  const handleSearchClicked = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const newFav = {
      url: url,
      key: timestamp,
      status: "new",
    };
    setUrl("");
    setFavz([...favz, newFav]);
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
          placeholder={"Example : http://www.twitch.tv"}
        />
        <button
          className={Styles.searchButton}
          disabled={url === ""}
          onClick={() => handleSearchClicked()}
        >
          <FontAwesomeIcon icon={faAdd} className="icon" />
        </button>
      </div>
      <section className={Styles.favz}>
        {revertedFavz.map((fav) => (
          <Fav key={fav.key} fav={fav} setFavz={setFavz} favz={favz} />
        ))}
      </section>
    </Layout>
  );
}
