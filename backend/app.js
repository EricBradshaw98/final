const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const watchlistsRouter = require('./routes/watchlists');
const stocksRouter = require('./routes/stocks');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const app = express();

app.use(cors()); // Enable CORS globally

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/watchlists', watchlistsRouter);
app.use('/stocks', stocksRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

module.exports = app;
