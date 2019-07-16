const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const db = require('./config/db');

const indexRouter = require('./routes/index');
const app = express();

const PORT = process.env.PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', indexRouter);

app.get('/client', (req, res) => {
  res.status(203).json({});
});

// catch 404 and forward to error handler
app.use(function(_, _1, next) {
  next(createError(404, 'Resource not found!'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({type: 'error', message: res.locals.message});
});

const client = require('./routes/client')(db, app);
// app.post('/client', client.createClient);

db.connection.sync()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Application listening on port: ${PORT}`);
      });
    });

module.exports = app;
