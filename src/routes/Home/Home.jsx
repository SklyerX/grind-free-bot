import React from "react";
import "./home.css";
import Logo from "../../assets/Logo.png";
import { Tooltip } from "@mantine/core";
import Login from "../../assets/Login.png";
import Dashboard from "../../assets/Dashboard.png";
import Settings from "../../assets/Settings.png";

const Home = () => {
  return (
    <div className="home">
      <div className="intro">
        <img src={Logo} alt="Grind Free Bot Logo" />
        <h1>Stop wasting time trying to get into nft whitelists</h1>
        <p>
          stop wasting time while getting into whitelists! write messages
          once... and let Grind Free Bot take care of it. its in the name, grind
          free bot will get you on whilelists without you spending hours on the
          computer trying to manage everything. Spend less earn more
        </p>
      </div>
      <div className="download">
        <h1>Download For Windows (mac coming soon...)</h1>
        <div className="download-cards">
          <Tooltip label="Click on logo to download" position="left">
            <div className="download-card">
              <a href="#"><i class="fa-brands fa-windows"></i></a>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="images">
          <div className="image">
            <img src={Login} alt="Login Page Image"/>
          </div>
          <div className="image">
            <img src={Dashboard} alt="Dashboard Page Image"/>
          </div>
          <div className="image">
            <img src={Settings} alt="Settings Page Image"/>
          </div>
      </div>
    </div>
  );
};

export default Home;
