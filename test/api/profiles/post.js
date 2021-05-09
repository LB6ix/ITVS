process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server');
const conn = require('../../../config/db.js');

describe('Post /api/profile/', (done) => {
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

it('Turėtų sukurti arba pakeisti profilį prisijungusiam naudotojui', (done) => {
  request(app)
    .post('/api/profile/')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NzUyZTUwZGNmNWE0ODg4ODE5NzZlIiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjA1MzAzNzksImV4cCI6MTYyMDg5MDM3OX0.KX_IyHXGP-DuSckbPk1vo29DBHH01j8cPdq0ygOBiYs'
    )
    .send({
      title: 'Praktikantas',
      department: 'IT skyrius',
      phoneNumber: '+37060474257',
      company: 'Telia',
      location: 'Kaunas'
    })

    .then((res) => {
      if (
        res.headers['Content-Type'] == 'application/json' &&
        res.body === undefined
      ) {
        res.body = JSON.parse(res.text);
      }
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('user');
      expect(body).to.contain.property('title');
      expect(body).to.contain.property('department');
      expect(body).to.contain.property('phoneNumber');
      expect(body).to.contain.property('company');
      expect(body).to.contain.property('location');
      expect(body).to.contain.property('date');
      done();
    })
    .catch((err) => done(err));
});
