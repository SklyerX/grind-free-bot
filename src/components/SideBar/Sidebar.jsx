import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Modal, MantineProvider, Button, Tooltip } from "@mantine/core";
import axios from "axios";

const Sidebar = () => {
  const [dashboard, setDashboard] = useState(false);
  const [settings, setSettings] = useState(false);
  const [support, setSupport] = useState(false);
  const [globe, setGlobe] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("/settings")) {
      getTheme();
      setSettings(true);
    } else if (window.location.href.includes("/dashboard")) {
      getTheme();
      setDashboard(true);
    } else if (window.location.href.includes("/support")) {
      getTheme();
      setSupport(true);
    } else if (window.location.href.includes("/globe")) {
      getTheme();
      setGlobe(true);
    }
  }, []);

  return (
    <div className="sidebar">
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Are you sure you want to logout?"
        >
          <div className="leave-or-not">
            <Button color="blue" style={{ "marginRight": "1rem"}} onClick={() => setOpened(false)}>Back To Safety</Button>
            <Button color="red" onClick={() => { window.location.replace("/login"); window.api.interface.relocate(); window.localStorage.removeItem("key"); window.localStorage.removeItem("theme")}}>Logout</Button>
          </div>
        </Modal>
      </MantineProvider>
      <div className="top">
        <div className="icons">
          <Tooltip label="Dashboard" withArrow arrowSize={6} transition={"pop"} position="right">
            <div className={`icon ${dashboard ? "selected" : ""}`}>
              <a href="/dashboard">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </a>
            </div>
          </Tooltip>
          <Tooltip label="Settings" withArrow arrowSize={6} transition={"pop"} position="right">
          <div className={`icon ${settings ? "selected" : ""}`} id="gear">
            <a href="/settings">
              <i className="fa-solid fa-gear"></i>
            </a>
          </div>
          </Tooltip>
          <Tooltip label="Support" withArrow arrowSize={6} transition={"pop"} position="right">
          <div className={`icon ${support ? "selected" : ""}`}>
            <a href="/support">
              <i className="fa-solid fa-heart"></i>
            </a>
          </div>
          </Tooltip>
          <Tooltip label="Website" withArrow arrowSize={6} transition={"pop"} position="right">
          <div className={`icon ${globe ? "selected" : ""}`}>
              <a href="#" onClick={() => window.api.interface.openWeb()}>
                <i className="fa-solid fa-globe"></i>
              </a>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="bottom">
      <Tooltip label="Logout" withArrow arrowSize={6} transition={"pop"} position="right">
        <div className="icon">
          <a
            href="#"
            onClick={() => {
              setOpened(true);
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;

function getTheme() {
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
      // console.log(response.data);
      window.localStorage.setItem("theme", response.data.data.Theme)
    })
    .catch(function (error) {
      console.log(error);
    });
}
