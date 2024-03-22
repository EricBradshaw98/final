const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const register = express.Router();
const bcrypt = require("bcrypt");
const { query } = require('../db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');



register.post("/", (request, response) => {

  // hash the password
  bcrypt.hash(request.body.password, 10)
      .then((hashedPassword) => {
        // Execute an SQL query to insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (email, password, first_name, last_name, username, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *';
        const queryValues = [request.body.email, hashedPassword, request.body.first_name, request.body.last_name, request.body.username];
  
        query(insertUserQuery, queryValues)
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result: result.rows[0] // Assuming you want to send back the inserted user data
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
  });

  register.delete("/", async (request, response) => {
    const { id } = request.body;
  
    try {
      console.log("Deleting user with ID:", id);
      // Remove entries from the watchlists table associated with the user
      const removeWatchlistEntriesQuery = `
        DELETE FROM watchlists
        WHERE user_id = $1
        RETURNING *
      `;
      const removedWatchlistResult = await query(removeWatchlistEntriesQuery, [id]);
      console.log("Removed watchlist entries:", removedWatchlistResult.rowCount);
  
      // Remove the user from the users table
      const removeUserQuery = `
        DELETE FROM users 
        WHERE id = $1
        RETURNING *
      `;
      const removedUserResult = await query(removeUserQuery, [id]);
      console.log("Removed user:", removedUserResult.rows);
  
      // Return the removed user data
      response.json({
        removedUser: removedUserResult.rows[0],
        removedWatchlistEntries: removedWatchlistResult.rowCount
      });
    } catch (error) {
      console.error("Error deleting:", error);
      response.status(500).send("Error removing user");
    }
  });

  
  module.exports = register;