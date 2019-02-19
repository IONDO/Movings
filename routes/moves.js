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
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Move.findById(id)
    .then((move) => {
      res.render('move', {
        move,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/update', (req, res, next) => {
  const { id } = req.params;
  Move.findById(id)
    .then((move) => {
      res.render('update', {
        move,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/update', (req, res, next) => {
  const { id } = req.params;
  const { name, origin, destination } = req.body;
  Move.findByIdAndUpdate(id, { name, origin, destination })
    .then(() => {
      res.redirect('/moves');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Move.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/moves');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
