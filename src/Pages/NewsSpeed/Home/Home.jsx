import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import HomeNews from "../HomeNews/HomeNews";

const Home = () => {
  // here will come navbar and other thing
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("newsFeed.json")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div>
      {news.map((newsFeed) => (
        <HomeNews key={newsFeed.id} newsFeed={newsFeed}></HomeNews>
      ))}
    </div>
  );
};

export default Home;
