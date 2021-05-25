process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server');
const conn = require('../../../config/db.js');

describe('Get /api/auth/', (done) => {
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

it('turėtų gauti naudotoją pagal autentifikacijos žetoną', (done) => {
  request(app)
    .get('/api/auth/')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhODBkOTFmN2Y2M2EyMjQ4Njc0MGQ1Iiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjE4MDgxMTksImV4cCI6MTYyNTQwODExOX0.n2zmiZu2tZ4RPI4whxlNZOxQ9cg5ajaOdUUdDoUmhP0'
    )
    .then((res) => {
      const body = res.body;
      expect(body.length).to.not.equal(0);
      expect(body).to.contain.property('role');
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('firstname');
      expect(body).to.contain.property('lastname');
      expect(body).to.contain.property('email');
      expect(body).to.contain.property('avatar');
      done();
    })
    .catch((err) => done(err));
});

it('turėtų gauti administratorių (naudotoją) pagal autentifikacijos žetoną', (done) => {
  request(app)
    .get('/api/auth/admin')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('role');
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('firstname');
      expect(body).to.contain.property('lastname');
      expect(body).to.contain.property('email');
      expect(body).to.contain.property('avatar');
      done();
    })
    .catch((err) => done(err));
});

it('darbuotojas turėtų gauti klaidą, bandant autorizuotis pagal admin', (done) => {
  request(app)
    .get('/api/auth/admin')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhODBkOTFmN2Y2M2EyMjQ4Njc0MGQ1Iiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjE4MDgxMTksImV4cCI6MTYyNTQwODExOX0.n2zmiZu2tZ4RPI4whxlNZOxQ9cg5ajaOdUUdDoUmhP0'
    )
    .then((res) => {
      const body = res.body;
      expect(body)
        .to.contain.property('errors')
        .to.deep.include({ msg: 'Neautorizuota' });
      done();
    })
    .catch((err) => done(err));
});
