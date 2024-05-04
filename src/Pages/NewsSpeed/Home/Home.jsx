import HomeNews from "../HomeNews/HomeNews";
import useContent from "../../../hooks/useContent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/Authprovider";
import PdfFiles from "../PdfFiles/PdfFiles";
import UploadedPDF from "../UploadedPDF/UploadedPDF";
import MostLikePdf from "../MostLikePdf/MostLikePdf";

const Home = () => {
  const { user } = useContext(AuthContext);
  // here will come navbar and other thing
  const [contents, refetch] = useContent();
  const [allUsers, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-7">
      <div className=" m-5">
        {" "}
        <MostLikePdf></MostLikePdf>
        <UploadedPDF></UploadedPDF>
      </div>
      <div>
        {contents.map((newsFeed) => (
          <HomeNews
            key={newsFeed.id}
            newsFeed={newsFeed}
            refetch={refetch}
          ></HomeNews>
        ))}
      </div>
      <div>
        {allUsers.map((users) => (
          <div key={users._id}>
            {/* <button onClick={() => handleClick(users.email)}>
              {(user?.displayName == users?.name) ? <></> : <p>{users.name}</p>}
            </button> */}
            {user?.displayName !== users?.name && <p>{users.name}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
