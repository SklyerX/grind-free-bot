import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar drag">
      <div className="interface no-drag">
        <i
          className="fa-solid fa-circle"
          onClick={() => {
            window.api.interface.minimize();
          }}
        ></i>
        <i
          className="fa-solid fa-circle"
          id="fullscreen"
          onClick={() => {
            window.api.interface.maximize();
          }}
        ></i>
        <i
          className="fa-solid fa-circle"
          onClick={() => {
            window.api.interface.exit();
          }}
        ></i>
      </div>
    </div>
  );
};

export default Navbar;
