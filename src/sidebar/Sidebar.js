import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import logo from "../assets/Akka_logo.png";
const Sidebar = ({ handleLogout }) => {
  const links = [
    {
      link_name: "Dashboard",
      link_path: "/",
    },
    {
      link_name: "Contacts list",
      link_path: "/contactlist",
    },
    {
      link_name: "Blogs list",
      link_path: "/bloglist",
    },
  ];

  return (
    <>
      <div class="sidebar">
        <div class="list">
          <img src={logo} alt="Akka Foundation" />

          <div class="links">
            {links.map((item, index) => (
              <Link to={item.link_path} key={index}>
                {item.link_name}
              </Link>
            ))}
          </div>
          <div class="btn" onClick={handleLogout}>
            logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
