import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/Authprovider";
import useContent from "../../../hooks/useContent";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa6";

const Contents = () => {
  const { user } = useContext(AuthContext);
  const [contents] = useContent();
  const [userPosts, setUserPosts] = useState([]);
  const [allImage, setAllImage] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/uploadFiles")
      .then((res) => res.json())
      .then((data) => setAllImage(data));
  }, []);
  console.log(allImage);
  // //  this is for input field of the comment section
  const [inputVisible, setInputVisible] = useState(false);
  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };

  useEffect(() => {
    const userUpdatedInfo = contents.filter(
      (updateInfo) => updateInfo?.email == user?.email
    );
    setUserPosts(userUpdatedInfo);
  }, [contents, user?.email]);

  return (
    <div className="mt-5">
      <p className="text-2xl font-bold">Posts</p>
      {userPosts.map((userPost) => (
        <div key={userPost._id} className="card w-full bg-slate-400 mt-5 mb-5">
          <div className="card-body">
            <div className="flex">
              <h2 className="card-title">{userPost.userName}</h2>
              <p className="ml-5">{userPost.date}</p>
            </div>
            {userPost?.uploadedContent ? (
              <>
                <p>{userPost.uploadedContent}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          <figure>
            {userPost?.img ? (
              <>
                <img className="h-96" src={userPost?.img} />
              </>
            ) : (
              <></>
            )}
          </figure>
          <div className="flex m-5  text-2xl">
            <button className="mr-5 hover:animate-bounce">
              <AiOutlineLike />
            </button>{" "}
            <button onClick={toggleInputVisible}>
              <FaCommentDots />
            </button>
          </div>
          {inputVisible && (
            <input
              type="text"
              className="bg-slate-200 text-black p-4 rounded-2xl"
              placeholder="Comment"
            />
          )}
        </div>
      ))}

      {/* this is for like and comment */}
    </div>
  );
};

export default Contents;
