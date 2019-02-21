const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

const bcryptSalt = 10;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { errorMessage: undefined });
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  if (username === '' || password === '') {
    res.render('signup', {
      errorMessage: 'Indicate a username and a password to sign up',
    });
  } else {
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
  }
});

module.exports = router;
