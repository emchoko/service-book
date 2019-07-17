const createError = require('http-errors')
  , express = require('express')
  , logger = require('morgan')
  , dotenv = require('dotenv').config()
  , db = require('./config/db')
  , router = require('./routes/index')
  , app = express()
  , PORT = process.env.PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app, db);

// catch 404 and forward to error handler
app.use(function (_, _1, next) {
  next(createError(404, 'Resource not found!'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ type: 'error', message: res.locals.message });
});

db.connection.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Application listening on port: ${PORT}`);
    });
  });

module.exports = app;
