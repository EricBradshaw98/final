const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { Pool } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// Initialize Express app
const app = express();

// Initialize PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Fetch existing users from the database
async function getUsers() {
  try {
    const query = 'SELECT email FROM users;';
    const { rows } = await pool.query(query);
    return rows.map(row => row.email);
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Send emails to users
async function sendWeeklyEmails() {
  const users = await getUsers();

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    subject: 'Your Weekly Update',
    html: '<p>Your email content here</p>',
  };

  // Send emails to each user
  users.forEach(user => {
    mailOptions.to = user;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });
}

// Schedule weekly email sending
cron.schedule('*/60 * * * * *', () => {
  console.log('Sending weekly emails...');
  sendWeeklyEmails();
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});