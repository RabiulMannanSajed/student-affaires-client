import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const HomeNews = ({ newsFeed, refetch }) => {
  const { _id, uploadedContent, userName, date, img, like } = newsFeed;
  const [inputVisible, setInputVisible] = useState(false);
  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };

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
    console.log(comment);

    console.log(_id);

    const comments = {
      comment: comment,
    };

    fetch(`http://localhost:5000/contents/${_id}/comments`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comments),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      });
    form.comment.value = " ";
  };
  return (
    <div className="m-5  bg-slate-400 p-5">
      <h2 className="mb-2">{userName}</h2> <p>{date}</p>
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
      )}
    </div>
  );
};

export default HomeNews;
