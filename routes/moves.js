const express = require('express');

const Move = require('../models/data');
const Box = require('../models/box');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.use(middlewares.protectedRoute);

/* Create, update and delete move. */

router.get('/new', (req, res, next) => {
  res.render('new');
});

router.post('/new', (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { name, origin, destination } = req.body;
  Move.create({
    name,
    origin,
    destination,
    userId: _id,
  })
    .then(() => {
      // TODO: redirect to the new move
      res.redirect('/move');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const move = await Move.findById(id);
    const boxes = await Box.find({ moveId: id });
    res.render('move', { move, boxes });
  } catch (error) {
    next(error);
  }
});

/* GET moves listing. */
router.get('/', (req, res, next) => {
  Move.find({ userId: req.session.currentUser._id })
    .then((moves) => {
      res.render('list', {
        moves,
      });
    })
    .catch((error) => {
      next(error);
    });
});

/* Update move. */
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
      res.redirect('/move');
    })
    .catch((error) => {
      next(error);
    });
});

/* Delete move. */

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Move.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/move');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
