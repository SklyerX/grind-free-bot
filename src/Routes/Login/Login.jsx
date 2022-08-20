import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./login.css";

const Login = () => {
  const [key, setKey] = useState("");
  const [authroized, setAuthorized] = useState(false);

  const navigate = useNavigate();

  if (authroized) {
    window.localStorage.setItem("key", key)
    navigate("/dashboard");
    window.api.interface.authroized();
  }

  return (
    <div className="login">
      <img src={Logo} alt="Grind Free Bot Logo" />

      <div className="bottom-content">
        <h1>Get Ready!</h1>
        <p>Only one step left to get to the dashboard!</p>
      </div>

      <div className="box">
        <h1>License Key</h1>

        <div className="container">
          <div className="top-half">
            <input
              type="password"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              onChange={(e) => {
                setKey(e.target.value);
              }}
            />
            <button
              onClick={async () => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                  key: key,
                });

                var requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };

                fetch("http://localhost:1234/v1/loginapp", requestOptions)
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result);
                    if (result.success === true) {
                      setAuthorized(true);
                    }
                  })
                  .catch((error) => console.log("error", error));
              }}
            >
              Login
            </button>
          </div>
          <div className="bottom-half">
            <div className="socials">
              <div className="social">
                <a href="/">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </div>
              <div className="social">
                <a href="/">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
              <div className="social">
                <a href="/">
                  <i className="fa-solid fa-globe"></i>
                </a>
              </div>
            </div>

            <a href="/" id="cta">
              Get Help <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
