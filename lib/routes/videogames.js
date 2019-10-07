/* eslint-disable new-cap */
const router = require('express').Router();
const Videogame = require('../models/videogames');
const ensureAuth = require('../middleware/ensure-auth');
const ensureRole = require('../middleware/ensure-role');

router
  .get('/', (req, res, next) => {
    Videogame.find()
      .lean()
      .then(videogames => res.json(videogames))
      .catch(next);
  })
  .post('/', ensureAuth(), ensureRole('admin'), (req, res, next) => {
    Videogame.create(req.body)
      .then(videogame => res.json(videogame))
      .catch(next);
  })
  .put('/:id', ensureAuth(), ensureRole('admin'), ({ params, body }, res, next) => {
    Videogame.updateOne({
      _id: params.id,
    }, body)
      .then(videogame => res.json(videogame))
      .catch(next);
  });

module.exports = router;