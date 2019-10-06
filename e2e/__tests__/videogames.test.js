const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');
const User = require('../../lib/models/user');

describe('Videogame App', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('videogames'));

  const videogame1 = {
    title: 'Super Smash Brothers',
    yearReleased: 2018
  };

  const videogame2 = {
    title: 'Mario Party',
    yearReleased: 2011
  };

  const adminTest = {
    email: 'admin@videogame.com',
    password: 'abc123'
  };

  const normalUser = {
    email: 'normal@normal.com',
    password: 'abc123'
  };

  function signinAdminUser(admin = adminTest) {
    return request
      .post('/api/auth/signin')
      .send(admin)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a movie but only with a user with permission', () => {
    return signupUser(adminTest)
      .then(user => {
        return User.updateById(user._id, {
          $addToSet: {
            roles: 'admin'
          }
        });
      })
      .then(() => {
        return Promise.all([
          signinAdminUser()
        ])
          .then(([admin]) => {
            return request
              .post('/api/videogames')
              .set('Authorization', admin.token)
              .send(videogame1)
              .expect(200)
              .then(({ body }) => {
                expect(body).toEqual({
                  ...videogame1,
                  _id: expect.any(String),
                  __v: 0
                });
              });
          });
      });
  });

  it('denies the ability of someone without user permission to post', () => {
    return signupUser(normalUser)
      .then(() => {
        return request
          .post('/api/auth/signin')
          .send(normalUser)
          .expect(200)
          .then(({ body }) => body)
          .then(user => {
            return request
              .post('/api/videogames')
              .set('Authorization', user.token)
              .send(videogame2)
              .expect(400)
              .then(({ body }) => {
                expect(body.error).toBe('User not authorized, must be admin');
              });
          });
      });
  });

  it('only allows those with admin access to put', () => {
    return signupUser(adminTest)
      .then(user => {
        return User.updateById(user._id, {
          $addToSet: {
            roles: 'admin'
          }
        });
      })
      .then(() => {
        return Promise.all([
          signinAdminUser()
        ])
          .then(([admin]) => {
            console.log(admin);
            return request;

          });
      });
  });
});
