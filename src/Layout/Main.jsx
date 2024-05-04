import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";
import SignUp from "../SignUp/SignUp";
import Navbar from "../Pages/NewsSpeed/Navbar/Navbar";
import backgroundImage from "../assets/bg Img.jpg";
const Main = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <>
          <div
            className="bg-cover bg-center w-full h-full "
            style={{
              backgroundImage: `url(${backgroundImage})
                `, // Set the URL as background image
            }}
          >
            <Navbar></Navbar>
            <Outlet></Outlet>
          </div>
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
