/* eslint-disable new-cap */
const router = require('express').Router();
const User = require('../models/user');

router
  .get('/favorites', ({ user }, res, next) => {
    User.findById(user.id)
      .populate('favorites', 'title')
      .lean()
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })

  .put('/favorites/:movieId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $addToSet: {
        favorites: params.movieId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  })
  
  .delete('/favorites/:movieId', ({ user, params }, res, next) => {
    User.updateById(user.id, {
      $pull: {
        favorites: params.movieId
      }
    })
      .then(({ favorites }) => res.json(favorites))
      .catch(next);
  });


module.exports = router;