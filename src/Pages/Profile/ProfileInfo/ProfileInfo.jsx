import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/Authprovider";
import { Link } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { IoSchoolSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const [userInfos] = useUserInfo();
  console.log(userInfos);

  useEffect(() => {
    const userUpdatedInfo = userInfos.find(
      (updateInfo) => updateInfo?.userEmail == user?.email
    );
    setUserInfo(userUpdatedInfo);
  }, [user?.email, userInfos]);
  console.log(userInfo);

  return (
    <div className="bg-slate-400 p-5 mt-4 rounded-xl">
      <h2 className="text-xl font-semibold ">{user.displayName} </h2>
      <p className="flex items-center">
        <MdOutlineWork className="mr-2" />
        {userInfo?.companyName}
      </p>
      <p className="flex items-center ">
        <IoSchoolSharp className="mr-2" />
        {userInfo?.varsity}
      </p>
      <p className="flex items-center ">
        <IoSchoolSharp className="mr-2" />
        {userInfo?.school}
      </p>
      <p className="flex items-center ">
        <FaLocationDot className="mr-2" /> From : {userInfo?.hometown}
      </p>
      <p className="flex items-center ">
        <FaHome className="mr-2" />
        Lives in :{userInfo?.currentCity}
      </p>
      <p className="flex items-center ">
        {" "}
        <FaHeart className="mr-2" />
        {userInfo?.relationship}
      </p>

      <Link className="btn btn-neutral w-full mt-3" to="/profileUpdate">
        Update Profile
      </Link>
    </div>
  );
};

export default ProfileInfo;
