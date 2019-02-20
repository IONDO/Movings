const express = require('express');

const router = express.Router();
const Move = require('../models/data');
const Box = require('../models/box');

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

router.get('/:moveId/box/new', (req, res, next) => {
  const { moveId } = req.params;
  res.render('box', { moveId });
});

router.post('/:moveId/box/new', (req, res, next) => {
  const { moveId } = req.params;
  const { name, description } = req.body;
  Box.create({
    name,
    description,
    moveId,
  })
    .then(() => {
      // TODO: redirect to the new move
      res.redirect(`/move/${moveId}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:moveId/box/:boxId', (req, res, next) => {
  const { boxId } = req.params;
  Box.findById(boxId)
    .then((box) => {
      res.render('box-show', {
        box,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:moveId/box/:boxId/update', (req, res, next) => {
  const { boxId } = req.params;
  Box.findById(boxId)
    .then((box) => {
      res.render('box-update', {
        box,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:moveId/box/:boxId/update', (req, res, next) => {
  const { moveId, boxId } = req.params;
  const { name, description } = req.body;
  Box.findByIdAndUpdate(boxId, { name, description })
    .then(() => {
      res.redirect(`/move/${moveId}/box/${boxId}`);
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
