import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";

const Body = () => {
  useFetchUser();
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
