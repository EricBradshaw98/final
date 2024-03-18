const express = require('express');
const { getUserByEmail } = require('../db/queries/userQueries');
const login = express.Router();
const bcrypt = require("bcrypt");



login.post('/', async (req, res) => {
  console.log('login route');
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  console.log('post/user', user);
  if (password === user.password) {
    console.log("we have a user", user.password)

    req.session.user_id = user.id;
    res.json({ user, success: true });
  } else {
    res.json({ user: null, success: false });
  }
});

module.exports = login;