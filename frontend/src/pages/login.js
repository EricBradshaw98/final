import React, { useState } from "react";
import axios from "axios";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    console.log('pages/login.js handleSubmit');
    e.preventDefault();
  
    console.log('formDatam', formData);
    axios.post("/users", formData)
      .then(res => {
        console.log(res);
        // Redirect after successful submission
        window.location.href = "/watchlist";
      })
      .catch(err => {
        console.log(err);
    });
    
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
