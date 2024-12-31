import React from "react";
import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({handleLogout}) => {
  const links = [
    {
      link_name: "Dashboard",
      link_path: "/",
    },
    {
      link_name: "Contact list",
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
          <img
            src="https://diwise.uk/static/media/logoblack.eb65a1ea49fdc4881dd5.svg"
            alt=""
          />

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
