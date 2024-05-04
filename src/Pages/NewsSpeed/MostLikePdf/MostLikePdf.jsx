import { useState } from "react";
import useUploadPdf from "../../../hooks/useUploadPdf";

const MostLikePdf = () => {
  const [uploadPdfs, refetch] = useUploadPdf();
  const [inputVisible, setInputVisible] = useState(false);
  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };
  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`);
  };
  return (
    <div className=" mb-5">
      <button className="btn btn-success" onClick={toggleInputVisible}>
        <p>Most preferred PDF</p>
      </button>
      {inputVisible && (
        <>
          {uploadPdfs.map((uploadPdf) =>
            uploadPdf.like > 2 ? (
              <>
                <div className="m-5 bg-[#85929E] bg-opacity-60 p-5 rounded-xl">
                  <p className="text-xl font-bold"> {uploadPdf.userEmail}</p>
                  <p className="font-bold">{uploadPdf.originalname}</p>

                  <button
                    onClick={() => showPdf(uploadPdf.fileName)}
                    className="btn btn-success mt-3"
                  >
                    show Pdf
                  </button>
                </div>
              </>
            ) : (
              <></>
            )
          )}
        </>
      )}
    </div>
  );
};

export default MostLikePdf;
