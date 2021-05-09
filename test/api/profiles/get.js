process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Get /api/profile/', (done) => {
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

it(' administratorius turėtų gauti naudotojų sąrašą', (done) => {
  request(app)
    .get('/api/profile/')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMDUxNjU3NywiZXhwIjoxNjIwODc2NTc3fQ.fMuUeGMvHlM_b5sL6UwdyED8KkV98P7PnxFfAg-D8Wg'
    )
    .then((res) => {
      const body = res.body;
      //expect(body).to.be.have.key('items');
      expect(body).to.be.an('array');
      expect(body.length).to.not.equal(1);
      done();
    })
    .catch((err) => done(err));
});

it(' darbuotojas turėtų gauti klaidą, bandant gauti naudotojų sąrašą', (done) => {
  request(app)
    .get('/api/profile/')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NzUyZTUwZGNmNWE0ODg4ODE5NzZlIiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjA1MzAzNzksImV4cCI6MTYyMDg5MDM3OX0.KX_IyHXGP-DuSckbPk1vo29DBHH01j8cPdq0ygOBiYs'
    )
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('errors');
      done();
    })
    .catch((err) => done(err));
});
