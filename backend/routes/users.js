// users.js
const express = require('express');
const router = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary

router.post('/', async (req, res) => {
  console.log('/api/login');
  try {
    return res.json({ success: true });
    // const result = await db.query('SELECT * FROM users');
    // res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;