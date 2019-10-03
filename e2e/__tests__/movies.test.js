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

  it('posts a movie for this user', () => {
    return request
      .post('/api/movies')
      .set('Authorization', user.token)
      .send(movie)
      .expect(200)
      .then(({ body }) => {
        expect(body.owner).toBe(user._id);
        expect(body).toMatchInlineSnapshot(
          {
            __v: 0,
            _id: expect.any(String),
            owner: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "owner": Any<String>,
            "title": "Gladiator",
            "yearReleased": 1998,
          }
        `
        );
      });
  });

  it('gets all of the movies', () => {
    return Promise.all([
      postMovie(movie),
      postMovie(movie),
      postMovie(movie)
    ]).then(() => {
      return request
        .get('/api/movies')
        .set('Authorization', user.token)
        .expect(200)
        .then(({ body }) => {
          expect(body[0].owner).toBe(user._id);
          expect(body.length).toBe(3);
          expect(body[0]).toMatchInlineSnapshot(
            {
              __v: 0,
              _id: expect.any(String),
              owner: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "owner": Any<String>,
              "title": "Gladiator",
              "yearReleased": 1998,
            }
          `
          );
        });
    });
  });
});
