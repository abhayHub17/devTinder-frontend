/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [skills, setSkills] = useState(user.skills);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const updateUser = async () => {
    try {
      const dataObj = {
        firstName,
        lastName,
        age,
        gender,
        photoURL,
        about,
        skills,
      };
      const res = await axios.patch(BASE_URL + "/profile/edit", dataObj, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center m-2">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  type="text"
                  className="input"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">PhotoURL</legend>
                <input
                  type="text"
                  className="input"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </fieldset>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={updateUser}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, age, gender, photoURL, about, skills }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
