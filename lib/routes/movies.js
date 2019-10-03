/* eslint-disable new-cap */
const router = require('express').Router();
const Movie = require('../models/movie');

router
  .post('/', (req, res, next) => {
    req.body.owner = req.user.id;

    Movie.create(req.body)
      .then(movie => res.json(movie))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
      .lean()
      .then(movie => res.json(movie))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Movie.find()
      .lean()
      .then(movie => res.json(movie))
      .catch(next);
  })
  .put('/:id', ({ params, body, user }, res, next) => {
    Movie.updateOne({
      _id: params.id,
      owner: user.id
    }, body)
      .then(movie => res.json(movie))
      .catch(next);
  })
  .delete('/:id', ({ params, user }, res, next) => {
    Movie.findByIdAndRemove({
      _id: params.id,
      owner: user.id
    })
      .then(movie => res.json(movie))
      .catch(next);
  });

module.exports = router;