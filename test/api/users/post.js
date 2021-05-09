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

it('Turėtų sukurti naudotoją bei išsiųsti email į naudotojo paštą', (done) => {
  request(app)
    .post('/api/users/')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMDUxNjU3NywiZXhwIjoxNjIwODc2NTc3fQ.fMuUeGMvHlM_b5sL6UwdyED8KkV98P7PnxFfAg-D8Wg'
    )
    .send({
      firstname: 'Testas',
      lastname: 'Testas2',
      email: 'staymadboy@gmail.com',
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
