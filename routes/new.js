const express = require('express');

const router = express.Router();
const Move = require('../models/data');

/* GET moves listing. */
router.get('/', (req, res, next) => {
  res.render('new');
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  const { name, origin, destination } = req.body;
  Move.create({
    name,
    origin,
    destination,
  })
    .then((move) => {
      // TODO: redirect to the new move
      res.redirect('moves');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
