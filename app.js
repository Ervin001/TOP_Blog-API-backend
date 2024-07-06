const createErrors = require('http-errors');
const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');

// routes
const apiRouter = require('./routes/api');

const app = express();

// set up mongoose connection
const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));

async function main() {
  console.log('Connected to DB');
  await mongoose.connect(process.env.MONGODB_URI);
  initAdmin();
}

// create admin
const initAdmin = async () => {
  try {
    const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminUser) {
      const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD);
      const newUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: process.env.ADMIN_NAME,
      });

      // add the admin role
      newUser.roles.push('admin');

      // save user to db
      await newUser.save();
    } else {
      return;
    }
  } catch (err) {
    console.error('Error initializing admin user', err);
  }
};

// passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // case insensitive search
        const regex = new RegExp(`^${email}$`, 'i');
        const user = await User.findOne({ email: regex });
        if (!user) {
          return done(null, false, {
            message: 'Incorrect email',
            errorType: 'email',
          });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, {
            message: 'Incorrect password',
            errorType: 'password',
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root URL to /blogs
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// routes
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createErrors(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.msg });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
