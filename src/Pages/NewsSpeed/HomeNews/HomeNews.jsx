import { useContext, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { AuthContext } from "../../../Provider/Authprovider";
import useComments from "../../../hooks/useComments";

const HomeNews = ({ newsFeed, refetch }) => {
  const { user } = useContext(AuthContext);
  const { _id, uploadedContent, userName, date, img, like } = newsFeed;
  const [comments] = useComments();
  const [userComments, setUserComment] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };

  useEffect(() => {
    const commentID = comments.filter(
      (comment) => String(comment?.contentId) === String(_id)
    );
    setUserComment(commentID);
  }, [_id, comments]);

  const handleLike = (id) => {
    console.log(id);
    const like = {
      like: 0,
    };

    fetch(`http://localhost:5000/contents/${_id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(like),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      });
  };

  const handleComment = (event) => {
    event.preventDefault();
    const form = event.target;
    let comment = form.comment.value;
    const commenterEmail = user?.email;
    const contentId = _id;

    const comments = {
      comment: comment,
      commenterEmail: commenterEmail,
      contentId: contentId,
    };

    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comments),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("comment added");
        }
      });
  };
  return (
    <div className="m-5 bg-[#85929E] bg-opacity-55 p-5 rounded-xl">
      <div className="flex">
        <h2 className="mb-2 mr-2">{userName}</h2> <p>{date}</p>
      </div>
      <div className="avatar ">
        <div className="">
          <img src={img} />
        </div>
      </div>
      <p>{uploadedContent}</p>
      <div className="flex mt-2 mb-2 text-2xl">
        <button
          className="mr-5 hover:animate-bounce"
          onClick={() => handleLike(_id)}
        >
          <AiOutlineLike />
          {/*add the like count*/}
        </button>{" "}
        <p className="mr-3">{like}</p>
        <button onClick={toggleInputVisible}>
          <FaCommentDots />
        </button>
      </div>
      {inputVisible && (
        <>
          {userComments.map((userComment) => (
            <div key={userComment._id}>
              <div className="bg-slate-900 mb-2  p-3 rounded-xl text-white">
                <p>{userComment.commenterEmail}</p>
                <p>{userComment.comment}</p>
              </div>
            </div>
          ))}
          <form onSubmit={handleComment} className="flex">
            <input
              type="name"
              placeholder="Comment "
              name="comment"
              className="input input-bordered"
              required
            />

            <button className="btn bg-green-400  " type="submit">
              <IoIosSend />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default HomeNews;
