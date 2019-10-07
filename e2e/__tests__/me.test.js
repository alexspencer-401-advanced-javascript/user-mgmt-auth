const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');

describe('Movie App', () => {
  beforeEach(() => dropCollection('movies'));
  beforeEach(() => dropCollection('users'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const movie = {
    title: 'Gladiator',
    yearReleased: 1998
  };

  function postMovie(movie) {
    return request
      .post('/api/movies')
      .set('Authorization', user.token)
      .send(movie)
      .expect(200)
      .then(({ body }) => body);
  }

  function putMovie(movie) {
    return postMovie(movie).then(movie => {
      return request
        .put(`/api/me/favorites/${movie._id}`)
        .set('Authorization', user.token)
        .expect(200)
        .then(({ body }) => body);
    });
  }

  it('puts a favorited movie', () => {
    return postMovie(movie).then(movie => {
      return request
        .put(`/api/me/favorites/${movie._id}`)
        .set('Authorization', user.token)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(1);
          expect(body[0]).toEqual(movie._id);
        });
    });
  });

  it('gets a favorited movie', () => {
    return putMovie(movie).then(() => {
      return request
        .get(`/api/me/favorites`)
        .set('Authorization', user.token)
        .expect(200)
        .then(({ body }) => {
          expect(body[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },
            `
            Object {
              "_id": Any<String>,
              "title": "Gladiator",
            }
          `
          );
        });
    });
  });

  it('deletes a favorited movie', () => {
    return putMovie(movie)
      .then(favoritedMovie => {
        return request
          .delete(`/api/me/favorites/${favoritedMovie[0]}`)
          .set('Authorization', user.token)
          .expect(200)
          .then(() => {
            return request
              .get('/api/me/favorites')
              .set('Authorization', user.token)
              .expect(200)
              .then(({ body }) => {
                expect(body.length).toBe(0);
              });
          });
      });
  });

});
