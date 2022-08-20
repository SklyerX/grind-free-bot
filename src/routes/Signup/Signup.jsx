import {
  MantineProvider,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./signup.css";

const Signup = () => {
  const [opened, setOpened] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit() {
    if(username.length === 0 || password.length === 0 || email.length === 0) {
      toast.error("One or more of the required fields is missing!")
      return console.log("One or more of the required fields is missing!");
    }

    if(!email.includes("@gmail")) {
      toast.error("We only allow gmails as of right now!")
      return;
    }

    if(confirm !== password) {
      toast.error("The password fields do not match!")
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "Username": username,
      "Password": password,
      "Email": email,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:4321/v1/account", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.success === true) {
          toast.success("Successfully created an account!");
          setTimeout(() => {
            window.location.replace("/login");
          }, 2000)
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="signup">
      <div className="signup-box">
        <ToastContainer theme="dark" />
        <MantineProvider theme={{ colorScheme: "dark" }}>
          <Modal
            opened={opened}
            overflow="inside"
            centered
            onClose={() => setOpened(false)}
            title="Grind Free Bot Terms and Policies"
          >
            <h4>Terms</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
              accusantium dolorem consectetur culpa sapiente, eaque quisquam
              molestias recusandae at a.
            </p>
            <h4>Privacy Policy</h4>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam maxime
            cupiditate ducimus eum dolor. Qui, voluptatibus cupiditate quos
            expedita a sit sequi culpa. Deleniti expedita maxime porro quisquam
            aliquam quos eos commodi atque excepturi, praesentium libero
            asperiores, distinctio, cumque quibusdam consequatur. Eligendi,
            corporis officia reprehenderit aut est maxime odio quibusdam?
          </Modal>
          <div className="signup-sections">
            <div className="signup-section">
              <TextInput placeholder="Your Email" label="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="signup-section">
              <TextInput placeholder="Your Username" label="Username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="signup-section">
              <PasswordInput placeholder="Your Password" label="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="signup-section">
              <PasswordInput placeholder="Confirm your password" label="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
            </div>
          </div>
          <div className="signup-cta">
            <button onClick={() => { handleSubmit() }}>Create Account</button>
            <a href="/login">Already have an account?</a>
          </div>
          <p>
            By creating an account you agree to Grind Free Bot's Terms Of
            Service and Privacy Policy{" "}
            <a href="#" onClick={() => setOpened(true)}>
              Click here to learn more
            </a>
          </p>
        </MantineProvider>
      </div>
    </div>
  );
};

export default Signup;
