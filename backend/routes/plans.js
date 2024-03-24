const express = require('express');
const { query } = require('../db/db'); // Assuming db.js is in the same directory

const plans = express.Router();

plans.post("/", async (req, res) => {
  try {
    console.log('plans.post ("/")');
    console.log('request.body:', req.body);

    const { userId, planName } = req.body;

    // Assuming you have a 'pool' object defined in your db module
    const queryText = `
      INSERT INTO plans (plan_name, user_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [planName, userId];
    const result = await query(queryText, values);

    // Redirect to frontend route
    res.status(201).json({
      success: true,
      message: 'Plan added successfully',
      redirectUrl: '/checkout', // Specify the URL of the Checkout.js component
      post: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating plan',
      error: error.message,
    });
  }
});


module.exports = plans;