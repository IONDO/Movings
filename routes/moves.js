const express = require('express');

const router = express.Router();
const Move = require('../models/data');

/* GET moves listing. */
router.get('/', (req, res, next) => {
  Move.find({})
    .then((moves) => {
      res.render('list', {
        moves,
      });
    });
});

module.exports = router;