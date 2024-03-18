const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const register = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db/db");
const postman = require('postman');


// register endpoint
register.post("/register", async (request, response) => {
  console.log('register.post')
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    // create a new user instance and collect the data
    const newUser = {
      email: request.body.email,
      password: hashedPassword,
    };

    // insert the new user into the database
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [newUser.email, newUser.password]);

    response.status(201).send({
      message: "User Created Successfully",
      result: rows[0], // Assuming you expect only one row to be returned
    });
  } catch (error) {
    console.error("Error creating user:", error);
    response.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
});

