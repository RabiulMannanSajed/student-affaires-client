import { AiOutlineLike } from "react-icons/ai";
import useUploadPdf from "../../../hooks/useUploadPdf";
import { useState } from "react";

const PdfFiles = ({ uploadPdfFile }) => {
  const [uploadPdfs, refetch] = useUploadPdf();
  const { fileName, userEmail, _id, originalname, like } = uploadPdfFile;
  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`);
  };

  const handleLike = (id) => {
    console.log(id);
    const like = {
      like: 0,
    };

    fetch(`http://localhost:5000/uploadFiles/${_id}/like`, {
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
  return (
    <div>
      <button className="btn btn-success" onClick={toggleInputVisible}>
        <p>Uploaded Pdfs</p>
      </button>
      {inputVisible && (
        <>
          {" "}
          <div className="m-5 bg-[#85929E] bg-opacity-60 p-5 rounded-xl">
            <div>
              <p className="text-xl font-bold"> {userEmail}</p>
              <p className="font-bold">{originalname}</p>

              <button
                onClick={() => showPdf(fileName)}
                className="btn btn-success mt-3"
              >
                show Pdf
              </button>
            </div>

            <div className="flex m-5  text-2xl">
              <button
                onClick={() => handleLike(_id)}
                className="mr-5 hover:animate-bounce"
              >
                <AiOutlineLike />
              </button>
              <div>
                {uploadPdfs.map((uploadPdf) => (
                  <p className="mr-3" key={uploadPdf._id}>
                    {uploadPdf.like}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfFiles;
