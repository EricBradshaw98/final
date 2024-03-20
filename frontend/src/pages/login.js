import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginPage = (props) => {
  const { dispatch, state } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", { email, password });
      console.log(response.data);

      // Set a cookie with the value of the user
      cookies.set("user_id", response.data.userId, { path: "/" });
      cookies.set("email", response.data.email, { path: "/" });
      // Change login state to true
      dispatch({ type: "SET_LOGIN_STATE" });
    } catch (error) {
      console.log(error);
      alert("Login failed!");
    }
  };


  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = () => {
    // Dispatch an action to reset the login state
    dispatch({ type: "SET_LOGIN_STATE" });
    cookies.remove("user_id");
    cookies.remove("email");
  };

  const handleChangeEmail = async () => {
    try {
      const user_id = cookies.get("user_id");
      console.log("User ID:", user_id);
      // Make an HTTP request to change the email
      const response = await axios.put("http://localhost:3001/login", {
        email: newEmail, id:user_id 
      });
      console.log(response.data);
      alert("Email changed successfully!");
    } catch (error) {
      console.error("Error changing email:", error);
      alert("Failed to change email. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    try {

      const user_id = cookies.get("user_id");
      console.log("User ID:", user_id);
      // Make an HTTP request to change the password
      const response = await axios.put("http://localhost:3001/login", {
        password: newPassword, id:user_id
      });
      console.log(response.data);
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  const user_id = cookies.get("user_id");
  console.log("User ID:", user_id);

  // Conditionally render based on login state
  if (!user_id) {
    return (
      <form onSubmit={handleSubmit}>
        {/* email */}
        <div controlId="formBasicEmail">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        {/* password */}
        <div controlId="formBasicPassword">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {/* submit button */}
        <button type="submit">Login</button>
      </form>
    );
  } else {
    return <div>
      <h2>Manage Your Account</h2>
      <button onClick={handleLogout}>Log Out</button>
      <div>
        <h3>Change Email</h3>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
        />
        <button onClick={handleChangeEmail}>Change Email</button>
      </div>
      <div>
        <h3>Change Password</h3>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>;
  }
};

export default LoginPage;
