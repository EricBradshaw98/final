const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const register = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db');
const jwt = require('jsonwebtoken');
const emailjs = require('@emailjs/server');
const bodyParser = require('body-parser');

// EmailJS setup
const emailServer = emailjs.server.connect({
  user: 'mikhailshemet@gmail.com',
  password: '.&28%?QBWMtQK%s',
  host: 'smtp.emailjs.com',
  ssl: true
});

register.post("/", (request, response) => {

  // hash the password
  bcrypt.hash(request.body.password, 10)
    .then((hashedPassword) => {
      // Execute an SQL query to insert the new user into the database
      const insertUserQuery = 'INSERT INTO users (email, password, first_name, last_name, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *';
      const queryValues = [request.body.email, hashedPassword, request.body.first_name, request.body.last_name];

      query(insertUserQuery, queryValues)
        .then((result) => {
          const templateParams = {
            from_name: 'Stock Market Magnet',
            from_email: 'mikhailshemet@gmail.com',
            to_name: request.body.first_name,
            message: 'Welcome to Stock Market Magnet! Thank you for registering with us.',
          };

          emailServer.send('service_dmqchgw', 'template_6t5wma1', templateParams)
            .then((emailResponse) => {
              console.log('Email sent:', emailResponse);
              response.status(201).send({
                message: "User Created Successfully",
                result: result.rows[0] // Assuming you want to send back the inserted user data
              });
            });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: "Error creating user",
        error: error.message // Send only the error message to avoid exposing sensitive info
      });
    });
})
  .catch((error) => {
    response.status(500).send({
      message: "Password hashing failed",
      error: error.message // Send only the error message to avoid exposing sensitive info
    });
  });


module.exports = register;