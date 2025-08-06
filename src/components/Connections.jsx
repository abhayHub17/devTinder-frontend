/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="text-xl font-bold flex justify-center m-20">
        No Connections found!!
      </h1>
    );

  return (
    <div className="text-center">
      <h1 className="text-2xl m-10">Connections</h1>
      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          gender,
          about,
          photoURL,
          skills,
        } = connection;
        return (
          <div
            key={_id}
            className="flex items-center rounded-lg my-4 p-4 mx-auto bg-base-300 w-1/2"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
