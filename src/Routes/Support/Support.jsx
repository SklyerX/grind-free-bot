import React from "react";
import "./support.css";

const Support = () => {
  return <div className="app-container">
    <div className="support-box">
      <div className="headline">
        <h1>About Grind Free Bot</h1>
        <p>...some helpful information</p>

        <div className="support-developer">
          <h3>❤️ Support Me</h3>
          <p>If you enojoy this app, the best way to support it is by jumping into our discord server <a href="https://discord.gg/observersteam">@observersteam</a>. We make 🔥 apps, tools, and bots! If you like to get incredible things visit us! If you find an error in this appp you drop a message in the server.</p>
        </div>

        <div className="support-sections">

            <div className="support-section">
                <h1>🤔 Why do we use discord tokens?</h1>
                <p>The reason we use discord tokens in order to send messages is because we have auto-replying features in our services which you can enable! We also use discord tokens to change your nickname in the target server so the mods get confused if you have a common profile. <span style={{ "color": "#f00"}}>If you want to use this app we recommend using a new discord account NOT YOUR MAIN</span></p>
            </div>
            
            <div className="support-section">
                <h1>🔑 Updates and Features</h1>
                <p>This app have many features but there will be more to come! here are somethings you can look forward too in the next update: Advanced UI, Custom Reply's</p>
            </div>
            
            <div className="support-section">
                <h1>🛠 A developer?</h1>
                <p>If you are a developer and know the following: <span style={{ "color": "#55D51D"}}>HTML, CSS, JS, REACTJS, ELECTRONJS</span> feel free to drop in <a href="https://discord.gg/observersteam" style={{ "color": "cyan", "textDecoration": "none"}}>here</a> and show us what you can do!</p>
            </div>

       </div>

      </div>
    </div>
  </div>;
};

export default Support;
