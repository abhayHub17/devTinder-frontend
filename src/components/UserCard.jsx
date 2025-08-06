/* eslint-disable no-unused-vars */
import React from "react";

const UserCard = ({ user }) => {
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
              <button className="btn btn-primary">Send Request</button>
              <button className="btn btn-primary">Ignore</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
