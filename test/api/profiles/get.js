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

it('administratorius turėtų gauti naudotojų sąrašą', (done) => {
  request(app)
    .get('/api/profile/')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
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

it('darbuotojas turėtų gauti klaidą, bandant gauti naudotojų sąrašą', (done) => {
  request(app)
    .get('/api/profile/')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhODBkOTFmN2Y2M2EyMjQ4Njc0MGQ1Iiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjE3OTYzMTAsImV4cCI6MTYyNTM5NjMxMH0.wS8ftHZEoCOjTuD4rQFGjJpLHHioAWDWts8Ooie-NzQ'
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

it('prisijungęs naudotojas turėtų gauti savo profilį', (done) => {
  request(app)
    .get('/api/profile/me')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .then((res) => {
      const body = res.body;
      expect(body.length).to.not.equal(0);
      expect(body).to.contain.property('_id'); //profilio id
      expect(body).to.contain.property('user').to.deep.include.property('_id'); //naudotojo id
      expect(body).to.contain.property('phoneNumber');
      expect(body).to.contain.property('title');
      expect(body).to.contain.property('department');
      expect(body).to.contain.property('company');
      expect(body).to.contain.property('location');
      done();
    })
    .catch((err) => done(err));
});

it('administratorius turėtų gauti profilį pagal naudotojo ID', (done) => {
  request(app)
    .get('/api/profile/user/609703cb9cbd87220cdf24cc') //user id
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .then((res) => {
      const body = res.body;
      expect(body.length).to.not.equal(0);
      expect(body).to.contain.property('_id'); //profilio id
      expect(body).to.contain.property('user').to.deep.include.property('_id'); //naudotojo id
      expect(body).to.contain.property('phoneNumber');
      expect(body).to.contain.property('title');
      expect(body).to.contain.property('department');
      expect(body).to.contain.property('company');
      expect(body).to.contain.property('location');
      done();
    })
    .catch((err) => done(err));
});
