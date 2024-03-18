const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({ origin: 'http://localhost:3000' })); // Correct placement
app.use(bodyParser.json());

const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'final_project',
  password: 'labber',
  port: 5432,
});

app.use(bodyParser.json());

// Login endpoint
app.post('/api/login', async (req, res) => {
  if (1 === 1) {
    console.log('/api/login');
  }
  const { username, password } = req.body;
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  // Check username and password against your mock users in PostgreSQL
  // Perform authentication logic here

  // For demonstration, let's assume username and password match
  if (username === 'mockuser' && password === 'mockpassword') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Check if the user is logged in
app.get('/api/checkLoggedIn', (req, res) => {
  // Implement logic to check if the user is logged in
  // For demonstration, assume the user is logged in
  res.json({ loggedIn: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});