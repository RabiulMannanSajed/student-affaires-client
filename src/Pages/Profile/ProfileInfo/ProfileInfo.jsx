import { useContext } from "react";
import { AuthContext } from "../../../Provider/Authprovider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-xl font-semibold ">{user.displayName} </h2>
      <Link to="/profileUpdate">edit</Link>
    </div>
  );
};

export default ProfileInfo;
