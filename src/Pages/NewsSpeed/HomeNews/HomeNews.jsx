import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";

const HomeNews = ({ newsFeed }) => {
  const { id, author, content, likes, comments } = newsFeed;

  const totalLikes = likes.length;
  const totalComment = comments.length;
  return (
    <div className="m-5 ">
      <h2>{author?.name}</h2>
      <div className="avatar ">
        <div className="w-10 rounded-full">
          <img src={author.profilePicture} />
        </div>
      </div>
      <p>{content}</p>
      <p className="flex">
        {totalLikes}
        <AiFillLike />
      </p>
      <p className="flex">
        {totalComment}
        <FaComment />
      </p>
    </div>
  );
};

export default HomeNews;
