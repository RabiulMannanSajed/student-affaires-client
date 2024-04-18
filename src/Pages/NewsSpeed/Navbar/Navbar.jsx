import { useContext, useState } from "react";
import { FaFacebookMessenger, FaHome, FaShoppingBag } from "react-icons/fa";
import { FiVideo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/Authprovider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user?.displayName);

  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navOption = (
    <>
      <li>
        <Link to="/">
          <FaHome className="w-12 text-xl" />
        </Link>
      </li>
      <li>
        <Link to="/video">
          <FiVideo className="w-12 text-xl" />
        </Link>
      </li>
      <li>
        <Link to="/jobs">
          <FaShoppingBag className="w-12 text-xl" />
        </Link>
      </li>
      <li>
        <Link to="/chat">
          <FaFacebookMessenger className="w-12 text-xl" />
        </Link>
      </li>
      {/* profile of the user then add the chat option  */}
    </>
  );
  return (
    <div className="navbar bg-orange-500">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOption}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOption}</ul>
      </div>
      <div className="navbar-end">
        {/*  make this is profile link */}
        <div className="avatar placeholder" onClick={toggleDropdown}>
          <div className="bg-neutral text-neutral-content rounded-full w-12">
            <span> {user?.displayName}</span>
          </div>
        </div>
        {showDropdown && (
          <ul className="dropdown-menu w-52 mt-2 ">
            {/* Add your dropdown menu items here */}
            <li>
              <a href="#">Dropdown Item 1</a>
            </li>
            <li>
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
