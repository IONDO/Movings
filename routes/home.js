const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const middlewares = require('../middlewares/index');

const router = express.Router();

/* GET home page. */
router.get('/', middlewares.protectedRoute, (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { errorMessage: undefined });
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  if (username === '' || password === '') {
    res.render('signup', {
      errorMessage: 'Indicate a username and a password to sign up',
    });
    return;
  }
  User.findOne({"username": username })
    .then((user) => {
      if (user !== null) {
        res.render('signup', {
          errorMessage: 'The username already exists!',
        });
        return;
      }
    });
  User.create({
    username,
    password: hashPass,
  })
    .then(() => {
      res.redirect('/move');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/login', (req, res, next) => {
  res.render('login', { errorMessage: undefined });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('/login', {
      errorMessage: 'Please enter both, username and password to sign up.',
    });
    return;
  }

  User.findOne({ "username": username })
    .then((user) => {
      if (!user) {
        res.render('login', {
          errorMessage: 'The username or the password is incorrect.',
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        res.render('/login', {
          errorMessage: 'The username or the password is incorrect.',
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});


router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

module.exports = router;
