import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://localhost:3001/login', {email: formData.email, password: formData.password}).then(res => console.log(res)).catch(error => console.error(error)); 
    // try {
    //   const response = await fetch('http://localhost:3001/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: { email: formData.email, password: formData.password }
    //   });
    //   console.log('response', response)
    //   if (response.ok) {
    //     setLoggedIn(true);
    //   } else {
    //     // Handle invalid credentials or other errors
    //     console.error('Login failed');
    //   }
    // } catch (error) {
    //   console.error('Error logging in:', error);
    // }
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
