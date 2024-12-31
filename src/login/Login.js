import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setUsername }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_PORT_BACKEND}user/login`,
        loginData
      );

      if (response.data.message === "Login successful") {
        const username = response.data.response.username;
        localStorage.setItem("username", username); 
        setUsername(username);
        navigate("/"); 
      }
    } catch (error) {
      console.log(error);

      if (error.message === "Request failed with status code 400 error") {
        alert("invalid username or password");
      }
    }
  };
  return (
    <>
      <div class="login parnet">
        <div class="login_form">
          <form action="" onSubmit={handleLogin}>
            <div class="form-row">
              <label for=""> Username </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
              />
            </div>
            <div class="form-row">
              <label for=""> Password </label>
              <input
                type="text"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>

            <div class="form-row">
              <input className="btn" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
