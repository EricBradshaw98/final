import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submited");
    //set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:5000/register",
      data: {
        email,
        password,
      },
    };
    axios(configuration)
    .then((result) => {console.log(result);})
    .catch((error) => {console.log(error);})
  }



  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        {/* email */}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        {/* password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {/* submit button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
