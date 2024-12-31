import React, { useContext } from "react";
import "./Dashboard.scss";
import { contextData } from "../Context";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const condata = useContext(contextData);



  return (
    <>
      <div class="dashboard">
        <Link class="box"  to="/contactlist">
          <h1>{condata.contactData.length}</h1>
          <p>
            Contact List
          </p>
        </Link>
        <Link class="box"  to="/bloglist" >
        <h1>  {condata.blogsData.length} </h1>
          <p>
            Blogs List
          </p>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
