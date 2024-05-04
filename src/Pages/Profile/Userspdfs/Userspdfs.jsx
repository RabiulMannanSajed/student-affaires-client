import { useContext, useEffect, useState } from "react";
import useUploadPdf from "../../../hooks/useUploadPdf";
import { AuthContext } from "../../../Provider/Authprovider";

const Userspdfs = () => {
  const { user } = useContext(AuthContext);
  const [uploadPdfs, refetch] = useUploadPdf();
  const [pdfs, setPdfsFils] = useState([]);
  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`);
  };

  useEffect(() => {
    const commentID = uploadPdfs.filter(
      (uploadPdf) => uploadPdf?.userEmail == user?.email
    );
    setPdfsFils(commentID);
  }, [uploadPdfs, user?.email]);
  return (
    <div>
      {pdfs.map((pdf) => (
        <div
          key={pdf._id}
          className="m-5 bg-[#85929E] bg-opacity-60 p-5 rounded-xl"
        >
          <div>
            <p className="text-xl font-bold"> {pdf.userEmail}</p>
            <p className="font-bold">{pdf.originalname}</p>

            <button
              onClick={() => showPdf(pdf.fileName)}
              className="btn btn-success mt-3"
            >
              show Pdf
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Userspdfs;
