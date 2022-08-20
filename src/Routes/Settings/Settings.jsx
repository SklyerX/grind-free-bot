import {
  MantineProvider,
  Modal,
  TextInput,
  Divider,
  PasswordInput,
  Button,
} from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import "./settings.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Light from "../../assets/lightmode.jpeg";
import Dark from "../../assets/darkmode.jpeg";

let errorString = "This Field Is Required!";

const Settings = () => {
  const [opened, setOpened] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [notify, setNotify] = useState(false);
  const [codes, setCodes] = useState(false);

  function updateCodes() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Key: window.localStorage.getItem("key"),
      Codes: !codes,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:1234/v1/change/codes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function updateNoti() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Key: window.localStorage.getItem("key"),
      Notify: !notify,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:1234/v1/change/notify", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    var data = JSON.stringify({
      Key: window.localStorage.getItem("key"),
    });

    var config = {
      method: "post",
      url: "http://localhost:1234/v1/account/data",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.data.NotifyLogin === true) {
          setNotify(true);
        } else {
          setNotify(false);
        }
        if (response.data.data.UseCodes === true) {
          setCodes(true);
        } else {
          setCodes(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function changeData() {
    if (
      username.length !== 0 &&
      password.length !== 0 &&
      newPassword.length !== 0 &&
      confirm.length !== 0
    ) {
      if (newPassword === confirm) {
        let data = JSON.stringify({
          Username: username,
          Password: password,
          NewPassword: newPassword,
        });

        let config = {
          method: "patch",
          url: "http://localhost:1234/v1/change/password",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            toast.success("Successfully changed your password!");
            setOpened(false);
          })
          .catch(function (error) {
            toast.error("Invalid Account Credentials");
            console.log(error);
          });
      } else {
        toast.error("The password fields do not match!");
      }
    } else {
      if (username.length < 1) {
        setUsernameError(errorString);
      }
      if (password.length < 1) {
        setPasswordError(errorString);
      }
      if (newPassword.length < 1) {
        setNewPasswordError(errorString);
      }
      if (confirmError.length < 1) {
        setConfirmError(errorString);
      }
    }
  }

  return (
    <div className="app-container">
      <ToastContainer theme="dark" />
      <div className="settings-box">
        <h1 id="heading">Settings</h1>
        <MantineProvider theme={{ colorScheme: "dark" }}>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduce yourself!"
          >
            <div className="before">
              <div className="username">
                <h5>Your Username</h5>
                <TextInput
                  icon={<i className="fa-solid fa-at"></i>}
                  placeholder="Your Username"
                  id="username"
                  error={usernameError}
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="password">
                <PasswordInput
                  placeholder="Password"
                  label="Password"
                  id="password"
                  error={passwordError}
                  description=" "
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Divider my="sm" style={{ marginTop: "2rem" }} />
            <div className="after">
              <div className="password">
                <PasswordInput
                  placeholder="Password"
                  label="New Password"
                  description=" "
                  error={newPasswordError}
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="confirm-password">
                <PasswordInput
                  placeholder="Password"
                  label="Confirm Password"
                  description=" "
                  error={confirmError}
                  style={{ marginBottom: "1rem" }}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>
            <Button
              color="red"
              onClick={() => {
                changeData();
              }}
            >
              CHANGE
            </Button>
          </Modal>
        </MantineProvider>
        <div className="settings-sections">
          <div className="settings-top">
            <div className="settings-left">
              <h1>Password and Authentication</h1>
              <p>
                These are settings you may need to configure depending on your
                likeing
              </p>
              <a href="#" onClick={() => setOpened(true)}>
                Change
              </a>
            </div>
            <div className="settings-right">
              <h1>Theme</h1>
              <div className="images">
                <div className="light">
                  <img
                    src={Light}
                    alt="Light mode picture"
                    onClick={() => changeTheme("light")}
                  />
                </div>
                <div className="dark">
                  <img
                    src={Dark}
                    alt="Dark mode picture"
                    onClick={() => changeTheme("dark")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-bottom">
          <div className="bottom-left">
            <h1 className="section-identifier">
              <i class="fa-solid fa-lock"></i> Authentication Steps
            </h1>
            <div className="auth-steps">
              <div className="auth-step">
                <h1>Email Verification</h1>
                <div className="desc-switch">
                  <p>
                    Send me alert notifications upon logging into my account.
                  </p>
                  <input
                    type="checkbox"
                    checked={notify ? true : false}
                    onChange={() => {updateNoti(); setNotify(!notify)}}
                  />
                </div>
              </div>
              <div className="auth-step">
                <h1>Use Backup Codes</h1>
                <div className="desc-switch">
                  <p>
                    Allow me to login to my account using my backup codes if I
                    loose access to my key/password
                    <a
                      href="#"
                      onClick={() => {
                        window.api.interface.downloadCodes(
                          window.localStorage.getItem("key")
                        );
                        toast.info("Check your downloads folder for the codes");
                      }}
                    >
                      click here to download codes
                    </a>
                  </p>
                  <input
                    type="checkbox"
                    checked={codes ? true : false}
                    onChange={() => {
                      updateCodes();
                      setCodes(!codes);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

function changeTheme(theme) {
  let data = JSON.stringify({
    Key: window.localStorage.getItem("key"),
    Theme: theme,
  });

  let config = {
    method: "patch",
    url: "http://localhost:1234/v1/change/theme",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}
