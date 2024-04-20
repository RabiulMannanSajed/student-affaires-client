import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Routers.jsx";
import Authprovider from "./Provider/Authprovider.jsx";
//  this is use to show in ui
ReactDOM.createRoot(document.getElementById("root")).render(
  <Authprovider>
    <React.StrictMode>
      <div className="bg-neutral text-neutral-content">
        <RouterProvider router={router} />
      </div>
    </React.StrictMode>
  </Authprovider>
);
