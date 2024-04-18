import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";
import SignUp from "../SignUp/SignUp";
import Navbar from "../Pages/NewsSpeed/Navbar/Navbar";
const Main = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* if the user is present then show him Outlet otherWish show signUp page  */}
      {user ? (
        <>
          <Navbar></Navbar>
          <Outlet></Outlet>
        </>
      ) : (
        <>
          <SignUp></SignUp>
        </>
      )}
    </div>
  );
};

export default Main;
