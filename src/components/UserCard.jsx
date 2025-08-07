/* eslint-disable no-unused-vars */
import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleStatus = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    user && (
      <div className="m-3">
        <div className="card bg-base-200 w-96 shadow-lg">
          <figure>
            <img src={user.photoURL} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {user.firstName + " " + user.lastName}
            </h2>
            <p>{user.age + ", " + user.gender}</p>
            <p>{user.about}</p>
            <p>{user.skills}</p>
            <div className="card-actions justify-Center">
              <button
                className="btn btn-primary"
                onClick={() => handleStatus("interested", user._id)}
              >
                Interested
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleStatus("ignored", user._id)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
