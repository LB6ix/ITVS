process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Get /api/logs/', (d) => {
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

it(' administratorius turėtų eksportuoti žurnalo įrašus į excel formatą', (done) => {
  request(app)
    .get('/api/logs/excel')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMDUxNjU3NywiZXhwIjoxNjIwODc2NTc3fQ.fMuUeGMvHlM_b5sL6UwdyED8KkV98P7PnxFfAg-D8Wg'
    )

    //expect(body).to.be.have.key('items');
    .expect(200, 'Successful Export', done);
});
