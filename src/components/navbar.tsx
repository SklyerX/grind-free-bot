import React, { useState } from 'react';
import "./navbar.css";

const navbar = () => {
  return (
    <div className="navbar">
        <div className="left">
            <h1 style={{ "cursor": "pointer"}} onClick={() => window.location.replace("/")}>Grind Free Bot</h1>
        </div>
        <div className="right">
            <a href={`${window.localStorage.getItem("cookie") === null || undefined ? "/login" : "/logout"}`}>{window.localStorage.getItem("cookie") === null || undefined ? "Login" : "Logout"}</a>
        </div>
    </div>
  )
}

export default navbar