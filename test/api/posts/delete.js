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

it('administratorius turėtų trinti pranešimą pagal ID', (done) => {
  request(app)
    .del('/api/posts/60a7f834e639163c3041a740')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .then((res) => {
      const body = res.body;
      expect(body).to.include({ msg: 'Pranešimas ištrintas' });
      done();
    })
    .catch((err) => done(err));
});

it('administratorius turėtų trinti pranešimo komentarą pagal ID', (done) => {
  request(app)
    .del('/api/posts/comment/60a7a0cb5ea099244c6abf05/60aae99f7819841564d576e1')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .then((res) => {
      const body = res.body;
      expect(body).to.be.an('array'); //returns remaining comments
      expect(body.length).to.be.above(0);
      done();
    })
    .catch((err) => done(err));
});
