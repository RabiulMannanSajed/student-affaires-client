import { useEffect, useState } from "react";
import PdfFiles from "../PdfFiles/PdfFiles";

const UploadedPDF = () => {
  const [uploadPdfs, setUploadPdfs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/uploadFiles")
      .then((res) => res.json())
      .then((data) => setUploadPdfs(data));
  }, []);
  return (
    <div>
      {uploadPdfs.map((uploadPdfFile) => (
        <PdfFiles
          key={uploadPdfFile._id}
          uploadPdfFile={uploadPdfFile}
        ></PdfFiles>
      ))}
    </div>
  );
};

export default UploadedPDF;
