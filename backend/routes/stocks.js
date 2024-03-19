// users.js
const express = require('express');
const router = express.Router(); // create an Express router
const db = require('../db/db.js'); // Adjust the path as necessary
// const cors = require('cors');


// router.use(cors({ origin: 'http://localhost:3000' }));

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM stocks');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;