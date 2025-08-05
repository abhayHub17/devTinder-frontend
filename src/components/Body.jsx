import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";

const Body = () => {
  useFetchUser(); //checks if there's a valid token in cookies or not. If not redirect to login page
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
