import { useEffect, useState } from "react";
import HomeNews from "../HomeNews/HomeNews";
import useContent from "../../../hooks/useContent";

const Home = () => {
  // here will come navbar and other thing
  const [news, setNews] = useState([]);
  const [contents, refetch] = useContent();
  useEffect(() => {
    fetch("newsFeed.json")
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <div>
      {contents.map((newsFeed) => (
        <HomeNews
          key={newsFeed.id}
          newsFeed={newsFeed}
          refetch={refetch}
        ></HomeNews>
      ))}
    </div>
  );
};

export default Home;
