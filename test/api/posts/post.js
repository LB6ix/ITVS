process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Post /api/posts/', (done) => {
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

it('administratorius turėtų sukurti pranešimą', (done) => {
  request(app)
    .post('/api/posts/')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({ text: 'Pranešimo tekstas', category: 'Licencijos' })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('text');
      expect(body).to.contain.property('category');
      expect(body).to.contain.property('firstname');
      expect(body).to.contain.property('lastname');
      done();
    })
    .catch((err) => done(err));
});

it('darbuotojas turėtų sukurti pranešimą', (done) => {
  request(app)
    .post('/api/posts/')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhODBkOTFmN2Y2M2EyMjQ4Njc0MGQ1Iiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjE3OTYzMTAsImV4cCI6MTYyNTM5NjMxMH0.wS8ftHZEoCOjTuD4rQFGjJpLHHioAWDWts8Ooie-NzQ'
    )
    .send({ text: 'Pranešimo tekstas', category: 'Licencijos' })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('text');
      expect(body).to.contain.property('category');
      expect(body).to.contain.property('firstname');
      expect(body).to.contain.property('lastname');
      done();
    })
    .catch((err) => done(err));
});
