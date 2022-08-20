import {
  Button,
  MantineProvider,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [opened, setOpened] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    if (username.length !== 0 && password.length !== "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const genRand = (len) => {
        return Math.random().toString(36).substring(2,len+2);
      }

      let cookie = genRand(8)

      var raw = JSON.stringify({
        Username: username,
        Password: password,
        Cookie: cookie
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4321/v1/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {console.log(result);
          if(result.success === true) {
            window.localStorage.setItem("cookie", cookie)
            window.location.replace("/dashboard")
          } else {
            toast.error("Invalid Username / Password")
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      toast.error("Please fill out all the required fields!");
    }
  }

  return (
    <div className="login">
      <div className="login-box">
        <ToastContainer theme="dark" />
        <div className="login-sections">
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <Modal
              opened={opened}
              centered
              onClose={() => setOpened(false)}
              title="Request a password reset"
            >
              <TextInput
                placeholder="Account Username"
                label="Account Username"
              />
              <br />
              <TextInput placeholder="Account Email" label="Account Email" />
              <br />
              <PasswordInput placeholder="New Password" label="New Password" />
              <br />
              <Button>Submit</Button>
            </Modal>
            <div className="login-section">
              <TextInput
                placeholder="Your Username"
                label="Username"
                className="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-section">
              <PasswordInput
                placeholder="Account password"
                label="Password"
                className="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                href="#"
                style={{ marginLeft: ".5rem" }}
                onClick={() => setOpened(true)}
              >
                Forgot your password?
              </a>
            </div>
          </MantineProvider>
        </div>

        <div className="login-cta">
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </button>
          <p>
            Need an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
