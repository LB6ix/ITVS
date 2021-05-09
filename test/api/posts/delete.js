process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Delete /api/posts/id', (done) => {
  before((done) => {
    conn
      .connectDB()
      .then(() => done())
      .catch((err) => done(err));
  });
});

after((done) => {
  conn
    .closeDB()
    .then(() => done())
    .catch((err) => done(err));
});

it(' turėtų trinti pranešimą pagal ID', (done) => {
  request(app)
    .del('/api/posts/6097468146bbe03f3cb69ec5')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMDUxNjU3NywiZXhwIjoxNjIwODc2NTc3fQ.fMuUeGMvHlM_b5sL6UwdyED8KkV98P7PnxFfAg-D8Wg'
    )
    .then((res) => {
      expect(200);
      done();
    })
    .catch((err) => done(err));
});
