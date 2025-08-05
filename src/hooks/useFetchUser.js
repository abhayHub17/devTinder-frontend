/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useFetchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (user) return; //if user is not logged or present then return
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      //if not logged in take the user to login page
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
};

export default useFetchUser;
