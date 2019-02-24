const express = require('express');

const Box = require('../models/box');
const middlewares = require('../middlewares/index');

const router = express.Router();

router.use(middlewares.protectedRoute);


/* Create, update and delete boxes. */

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
  const { boxId, moveId } = req.params;
  Box.findById(boxId)
    .then((box) => {
      res.render('box-show', {
        box, moveId,
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
      res.redirect(`/box/${moveId}/box/${boxId}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:moveId/box/:boxId/delete', (req, res, next) => {
  const { moveId, boxId } = req.params;
  Box.findByIdAndDelete(boxId)
    .then(() => {
      res.redirect(`/move/${moveId}`);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router; 