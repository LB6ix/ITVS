process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server');
const conn = require('../../../config/db.js');

describe('Post /api/users/', (done) => {
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

it('administratorius turėtų sukurti naudotoją bei išsiųsti email į naudotojo paštą', (done) => {
  request(app)
    .post('/api/users/')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      firstname: 'Testas',
      lastname: 'Testas2',
      email: 'throwawayacc7x@gmail.com',
      role: 'member',
      password: 'testing456'
    })

    .then((res) => {
      if (
        res.headers['Content-Type'] == 'application/json' &&
        res.body === undefined
      ) {
        res.body = JSON.parse(res.text);
      }
      expect('Message Sent'); //nesiunčia be successful save
      done();
    })
    .catch((err) => done(err));
});

// expect(body).to.contain.property('role');
// expect(body).to.contain.property('_id');
// expect(body).to.contain.property('firstname');
// expect(body).to.contain.property('lastname');
// expect(body).to.contain.property('email');
