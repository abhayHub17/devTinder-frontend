/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h2>No pending requests found!</h2>;

  return (
    <div className="text-center">
      <h1 className="text-2xl m-10">Connection Requests</h1>
      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          gender,
          about,
          photoURL,
          skills,
        } = request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center rounded-lg my-4 p-4 mx-auto bg-base-300 w-2/3"
          >
            <div>
              <img
                src={photoURL}
                alt="connection"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="ml-4 text-left">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{age + ", " + gender}</p>
              <p>{about}</p>
              <p>{skills}</p>
            </div>
            <div className="flex">
              <button className="btn btn-primary m-2">Reject</button>
              <button className="btn btn-secondary m-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
