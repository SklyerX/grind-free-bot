import { ToastContainer, toast } from "react-toastify";
import { Modal, MantineProvider } from "@mantine/core";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import "./dashboard.css";
import axios from "axios";

let interval;
let counter = 0;

const Dashboard = () => {
  const [messages, setMessage] = useState([]);
  const [areMessages, setAreMessages] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState("");
  const [isvalidToken, setIsValidToken] = useState(false);
  const [isvalidChannel, setIsValidChannel] = useState(false);
  const [channel, setChannel] = useState("");
  const [isvalidGuild, setIsValidGuild] = useState(false);
  const [guild, setGuild] = useState(false);
  const [useNickname, setUsenickname] = useState(false);
  const [nickname, setNickname] = useState("");
  const [delay, setDelay] = useState(0);
  const [opened, setOpened] = useState(false);
  const [idModal, setIdModal] = useState(false);

  // TODO TMR
  // Fix: nickname and setNikcname hook with validation that the useNickname hook is turned on
  // Fix: make sure all fields are valid on the click of the start button ✅
  // Fix: Other pages
  // Fix: Create Website
  // Final: Upload Application
  // Due Date: 2 days

  // if (useNickname === true) {
  //   console.log(nickname);
  // }

  // Token: MTAwNzQ1NDk2MDEwOTI0MDM1MQ.GxOpbQ.klq9Iy31YHxkoV0QBIEcmeS5_ULF82-4iFlhms
  // Channel: 1007463674476232778
  // Guild: 1007463674476232774

  function sendMessages() {
    toast.info("Validating Input Fields...");
    if (
      areMessages === true &&
      isvalidToken === true &&
      isvalidChannel === true &&
      isvalidGuild === true &&
      delay !== 0
    ) {
      toast.dismiss();
      toast.success("Fields are valid!");

      toast.loading("Sending Messages!");

      interval = setInterval(() => {
        if (messages[counter] === undefined) counter = 0;

        let data = JSON.stringify({
          content: messages[counter],
        });

        let config = {
          method: "post",
          url: `https://discord.com/api/v9/channels/${channel}/messages`,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config).catch(function (error) {
          console.log(error);
          document
            .querySelector(".logs")
            .insertAdjacentHTML(
              "afterbegin",
              `<p style="color: #f00; font-size: 1.3rem; font-weight: bold; padding: 1rem;">[ ERROR ] Erro While Sending Message</p>`
            );
        });
        counter++;
        document
          .querySelector(".logs")
          .insertAdjacentHTML(
            "afterbegin",
            `<p style="color: green; font-size: 1.3rem; font-weight: bold; padding: .5rem;">[ SENT ] ${messages[counter]}</p>`
          );
      }, delay * 1000);

      if (useNickname === true) {
        var nickContent = JSON.stringify({
          nick: nickname,
        });

        var configuration = {
          method: "patch",
          url: `https://discord.com/api/v6/guilds/${guild}/members/@me/nick`,
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          data: nickContent,
        };

        setTimeout(() => {
          axios(configuration)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          document
            .querySelector(".logs")
            .insertAdjacentHTML(
              "afterbegin",
              `<p style="color: #d1c605; font-size: 1.3rem; font-weight: bold; padding: .5rem;">[ Update ] New Nickname: ${nickname}</p>`
            );
        }, 600000);
      }
    } else {
      toast.dismiss();
      toast.error("One or more of the required fields is invalid");
      setDisabled(!!disabled);
    }
  }

  return (
    <div className="app-container">
      <ToastContainer theme="dark" />
      <div className="sections">
        <div className="top-section">
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Introduce yourself!"
            >
              <iframe
                width="400"
                height="315"
                src="https://www.youtube.com/embed/YEgFvgg7ZPI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Modal>
          </MantineProvider>
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <Modal
              opened={idModal}
              onClose={() => setIdModal(false)}
              title="Introduce yourself!"
            >
              <iframe
                width="400"
                height="315"
                src="https://www.youtube.com/embed/NLWtSHWKbAI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Modal>
          </MantineProvider>
          <div className="left-section">
            <div
              className="dropzone"
              onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.stopPropagation();
                e.preventDefault();

                const files = e.dataTransfer.files;

                for (const file of files) {
                  console.log(file);
                  window.api.interface.upload(file.path);
                }

                window.api.user.messages((data) => {
                  setMessage(data);
                  setAreMessages(true);
                });
              }}
            >
              <h1>
                {messages.length < 1
                  ? "Drop Files Here"
                  : `Loaded: ${messages.length} messages`}
              </h1>
            </div>
          </div>
          <div className="right-section">
            <div className="options">
              <div className="option">
                <h1>Account Token</h1>
                <input
                  type="password"
                  placeholder="Discord Account Token"
                  id="token"
                  style={{ borderColor: isvalidToken ? "#2BB639" : "#f00" }}
                  onChange={(e) => {
                    var config = {
                      method: "get",
                      url: "https://discord.com/api/v9/users/@me",
                      headers: {
                        Authorization: e.target.value,
                      },
                    };

                    axios(config)
                      .then(function (response) {
                        setIsValidToken(!isvalidToken);
                        setToken(e.target.value);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                />
                <a href="#" onClick={() => setOpened(true)}>
                  Don't know how to get account token?
                </a>
              </div>
              <div className="option">
                <h1>Channel Id</h1>
                <input
                  type="number"
                  placeholder="Target Channel Id"
                  style={{ borderColor: isvalidChannel ? "#2BB639" : "#f00" }}
                  onChange={(e) => {
                    var config = {
                      method: "get",
                      url: `https://discord.com/api/v9/channels/${e.target.value}/messages`,
                      headers: {
                        Authorization: token,
                      },
                    };

                    axios(config)
                      .then(function (response) {
                        if (response.data.length) {
                          setIsValidChannel(!isvalidChannel);
                          setChannel(e.target.value);
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                />
                <a href="#" onClick={() => setIdModal(true)}>
                  Don't know how to get a channels id?
                </a>
              </div>
              <div className="option">
                <h1>Server Id</h1>
                <input
                  type="number"
                  placeholder="Target Server Id"
                  style={{ borderColor: isvalidGuild ? "#2BB639" : "#f00" }}
                  onChange={(e) => {
                    var config = {
                      method: "get",
                      url: `https://discord.com/api/v9/guilds/${e.target.value}/channels`,
                      headers: {
                        Authorization: token,
                      },
                    };

                    axios(config)
                      .then(function (response) {
                        if (response.data.length) {
                          setIsValidGuild(true);
                          setGuild(e.target.value);
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }}
                />
                <a href="#" onClick={() => setIdModal(true)}>
                  Don't know how to get a servers id?
                </a>
              </div>
              <div className="option">
                <h1>Custom Nickname</h1>
                <input
                  type="text"
                  placeholder="Custom Nickname"
                  disabled={useNickname ? false : true}
                  style={{ cursor: useNickname ? "text" : "not-allowed" }}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              </div>
              <div className="option delay">
                <h1>Delay</h1>
                <input
                  type="number"
                  placeholder="in seconds"
                  id="delay"
                  onChange={(e) => {
                    setDelay(e.target.value);
                  }}
                />
              </div>
              <div className="option nickname">
                <h1>Change Nickname</h1>
                <label className="switch" htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={(e) => {
                      console.log(e.target.checked);
                      if (e.target.checked === true) {
                        setUsenickname(true);
                      } else {
                        setUsenickname(false);
                      }
                    }}
                  />
                  <div className="slider round"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <div className="logs"></div>
          <div className="btns">
            <button
              id="start"
              disabled={disabled}
              onClick={() => {
                setDisabled(!disabled);
                sendMessages();
              }}
            >
              Start
            </button>
            <button
              id="pause"
              disabled={!disabled}
              onClick={() => {
                setDisabled(!disabled);
                console.log(interval);
                clearInterval(interval);
                toast.dismiss();
              }}
            >
              Pause
            </button>
            <button
              id="stop"
              disabled={!disabled}
              onClick={() => window.location.reload()}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
