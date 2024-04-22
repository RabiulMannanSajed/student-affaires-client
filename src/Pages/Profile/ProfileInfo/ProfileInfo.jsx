import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/Authprovider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/userInfos")
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);
  const userInDb = userInfo.find((dbUser) => dbUser?.email === user?.email);
  console.log(userInDb);
  return (
    <div>
      <h2 className="text-xl font-semibold ">{user.displayName} </h2>
      <Link to="/profileUpdate">edit</Link>
    </div>
  );
};

export default ProfileInfo;
