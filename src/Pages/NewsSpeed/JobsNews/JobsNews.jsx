import { useContext, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa6";
import axios from "axios";
import { AuthContext } from "../../../Provider/Authprovider";
import useJobPdf from "../../../hooks/useJobPdf";

const JobsNews = ({ content, refetch }) => {
  const { user } = useContext(AuthContext);
  const [JobPdfFiles] = useJobPdf();
  const { _id, uploadedContent, userName, date, img, like } = content;
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
  const [inputVisible, setInputVisible] = useState(false);

  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };
  //  this is for upload files
  const [file, setFile] = useState("");
  // const [uploadedUrl, setUploadedUrl] = useState("");
  const userEmail = user?.email;
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formDataObject = {
      file: file,
      email: userEmail,
    };

    Object.keys(formDataObject).forEach((key) => {
      formData.append(key, formDataObject[key]);
    });

    console.log(file);
    const result = await axios.post(
      "http://localhost:5000/JobPdfFiles",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    alert("File Uploaded");
  };
  const [allUsers, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`);
  };
  return (
    <div className="grid grid-cols-3">
      <div></div>
      <div className=" bg-[#85929E] bg-opacity-60 mt-5 mb-5 rounded-xl p-4">
        <div className="flex font-bold text-xl">
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
            {JobPdfFiles.map((JobPdfFile) => (
              <div key={JobPdfFile._id}>
                <div className="bg-slate-900 mb-2  p-3 rounded-xl text-white">
                  <p>{JobPdfFile.userEmail}</p>
                  <div className="flex items-center justify-between">
                    <p>{JobPdfFile.originalname}</p>
                    <button
                      onClick={() => showPdf(JobPdfFile.fileName)}
                      className="btn btn-success mt-3"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <form
              action=""
              onSubmit={submitImage}
              className="flex items-center"
            >
              <input
                type="file"
                className=" bg-slate-500 h-8 rounded-xl"
                accept="application/pdf"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className="btn btn-success ">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
      <div>
        {allUsers.map((users) => (
          <div key={users._id}>
            {user?.displayName !== users?.name && <p>{users.name}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsNews;
