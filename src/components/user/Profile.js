import { Link } from "react-router";
import React from "react";
import Services from "./Services";

const Profile = () => {
  return (
    <div>
      <h2>
        {"Profile"}
      </h2>
      <img src="http://lorempixel.com/g/200/200/" />
      <h3>
        {"Username"}
      </h3>
      <div>
        <ul className="user-info">
          <li>
            <span>
              {"email@host.com"}
            </span>
          </li>
          <li>
            <span>
              {"Address"}
            </span>
          </li>
          <li>
            <Link to={"/user/id"}>
              {"Add/Edit Address"}
            </Link>
          </li>
          <li>
            <Link to={"/user/id"}>
              {"Edit"}
            </Link>
          </li>
        </ul>
      </div>
      <Services />
    </div>
  );
};

export default Profile;
