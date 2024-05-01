import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/Authprovider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const UploadContent = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const userName = user?.displayName;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      uploadedContent: "",
    },
  });
  const date = new Date().toJSON().slice(0, 10);

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    // Upload restaurant image
    const contentImgRes = await fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    });
    const contentImgData = await contentImgRes.json();
    const contentImgUrl = contentImgData.success
      ? contentImgData.data.display_url
      : null;

    // send data to the data base
    fetch("http://localhost:5000/contents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uploadedContent: data.uploadedContent,
        img: contentImgUrl,
        email: userEmail,
        userName: userName,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        Swal.fire("Added successfully");
        console.log("Response from server:", responseData);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };
  //  this is for upload files
  const [file, setFile] = useState("");
  // const [uploadedUrl, setUploadedUrl] = useState("");

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const result = await axios.post(
      "http://localhost:5000/uploadFiles",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
  };

  return (
    <div className="bg-slate-400 p-5 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <label className="label">
          <span className="label-text text-xl font-semibold"></span>
        </label>
        <textarea
          type="text"
          className="input input-bordered w-full rounded-3xl"
          placeholder=" What's on you mind? "
          {...register("uploadedContent")}
        />
        <br />
        <div className="flex items-center">
          <div className="form-control w-full max-w-xs">
            <label className="label ">
              <span className="label-text "> </span>
            </label>
            <input
              {...register("image")}
              type="file"
              className="file-input file-input-bordered w-full "
            />
          </div>
          <div>
            <button className="btn bg-green-400 mt-3 " type="submit">
              <IoIosSend />
            </button>
          </div>
        </div>
      </form>
      {/*  this is for upload file  */}
      <form action="" onSubmit={submitImage}>
        <input
          type="file"
          className=""
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadContent;
