const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const bcrypt = require("bcrypt");
const { query } = require('./db/db'); // Assuming db.js is in the same directory
const jwt = require('jsonwebtoken');
const auth = require("./auth");
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const watchlistsRouter = require('./routes/watchlists');
const stocksRouter = require('./routes/stocks');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const app = express();
const { sendWeeklyEmails } = require('./emailService/emailPeriodically');

app.use(cors({ origin: 'http://localhost:3000' }));



// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});



app.get("/abcde", async (req, res) => {
  const data = await read("abc.txt");
  res.send('abcde')
  // return res.status(200).json({ data });
});

app.post("/abc", async (req, res) => {
  console.log(req.body);
  return res.status(200).json({ success: true });
});
//use section
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/watchlists', watchlistsRouter);
app.use('/stocks', stocksRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

sendWeeklyEmails();

module.exports = app;
