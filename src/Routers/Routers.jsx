import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import Home from "../Pages/NewsSpeed/Home/Home";
import Video from "../Pages/NewsSpeed/Video/Video";
import Jobs from "../Pages/NewsSpeed/Jobs/Jobs";
import Chat from "../Pages/NewsSpeed/Chat/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/video",
        element: <Video></Video>,
      },
      {
        path: "/jobs",
        element: <Jobs></Jobs>,
      },
      {
        path: "/chat",
        element: <Chat></Chat>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
