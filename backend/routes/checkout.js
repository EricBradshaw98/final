const express = require('express');
const { query } = require('../db/db'); // Assuming db.js is in the same directory

const checkout = express.Router();

checkout.get("/", async (req, res) => {
  console.log('checkout.get ("/")');
  // Send the response indicating the checkout page
  res.send("This is the checkout page");
});

module.exports = checkout;