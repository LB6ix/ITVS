process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Post /api/auth/', (done) => {
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

it('naudotojas turėtų prisijungti, gauti JWT žetoną', (done) => {
  request(app)
    .post('/api/auth/')
    .set('Content-Type', 'application/json')
    .send({ email: 'lbulotadarbuotojas@gmail.com', password: 'qwerty' })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('token');
      done();
    })
    .catch((err) => done(err));
});

it('administratorius turėtų prisijungti, gauti JWT žetoną', (done) => {
  request(app)
    .post('/api/auth/admin')
    .set('Content-Type', 'application/json')
    .send({ email: 'liudasb97@gmail.com', password: 'qwerty' })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('token');
      done();
    })
    .catch((err) => done(err));
});
