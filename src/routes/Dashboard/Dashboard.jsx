import { Tooltip } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./dashboard.css";

const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [key, setKey] = useState("");

    useEffect(() => {
        if(window.localStorage.getItem("cookie") === null || undefined) {
            window.location.replace("/");
            return console.log("Invalid Session Cookie");
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
        var raw = JSON.stringify({
          Cookie: window.localStorage.getItem("cookie"),
        });
      
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
      
        fetch("http://localhost:4321/v1/account/cookie", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.success === true) {
              toast.success(`Welcome Back! ${result.data.Username}`);
              setUsername(result.data.Username);
              setKey(result.data.key)
            }
          })
          .catch((error) => console.log("error", error));
    }, [])
  return <div className="dashboard">
    <ToastContainer theme="dark" />

    <div className="keyBox">
        <h1>Welcome Back! {username}</h1>
        <p>Copy the key below in order to access your account through the app!</p>
        <Tooltip label="click to copy" arrowSize={6} withArrow>
            <div className="copy" onClick={() => {
                navigator.clipboard.writeText(key);
                toast.success("Key Copied!")
            }}>
                <div className="key">
                    <p>{key.slice(23).replace(/^[a-zA-Z0-9]/, "***********************")}</p>
                </div>
                <div className="icon">
                    <p>
                        <i className="fa-solid fa-copy"></i>
                    </p>
                </div>
            </div>
        </Tooltip>
    </div>
  </div>;
};

export default Dashboard;
