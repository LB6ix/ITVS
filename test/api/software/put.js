process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Put /api/software/', (done) => {
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

// it('administratorius turėtų redaguoti programinės įrangos įrašą', (done) => {
//   request(app)
//     .put('/api/software/edit/60a78c47618c5319448aa13b')
//     .set('Content-Type', 'application/json')
//     .set(
//       'x-auth-token',
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
//     )
//     .send({
//data
//     })
//     .then((res) => {
//       const body = res.body;
//       expect(body).to.contain.property('_id');
//       expect(body).to.contain.property('license');
//       expect(body).to.contain.property('key');
//       expect(body).to.contain.property('manufacturer');
//       expect(body).to.contain.property('status');
//       expect(body).to.contain.property('totalAmount');
//       expect(body).to.contain.property('cost');
//       expect(body).to.contain.property('supplier');
//       done();
//     })
//     .catch((err) => done(err));
// });

it('administratorius turėtų priskirti programinės įrangos įrašą', (done) => {
  request(app)
    .put('/api/software/6094aa2b48a2e14f3c6d35af/checkout')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      assignedTo: '609703cb9cbd87220cdf24cc',
      checkOutDate: '2021-05-25T20:07:14.769Z'
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('license');
      expect(body).to.contain.property('expDate');
      expect(body).to.contain.property('key');
      expect(body).to.contain.property('manufacturer');
      expect(body).to.contain.property('status');
      expect(body).to.include({
        assignedTo: '609703cb9cbd87220cdf24cc'
      });
      expect(body).to.contain.property('totalAmount');
      expect(body).to.contain.property('cost');
      expect(body).to.contain.property('supplier');
      done();
    })
    .catch((err) => done(err));
});

it('administratorius turėtų atsiimti programinės įrangos įrašą', (done) => {
  request(app)
    .put('/api/software/6094ae582304d83d641fff6a/checkin')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      status: 'Aktyvi',
      checkInDate: '2021-05-18T20:07:14.769'
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('license');
      expect(body).to.contain.property('expDate');
      expect(body).to.contain.property('key');
      expect(body).to.contain.property('manufacturer');
      expect(body).to.include({ status: 'Aktyvi' });
      expect(body).to.contain.property('totalAmount');
      expect(body).to.contain.property('cost');
      expect(body).to.contain.property('supplier');
      done();
    })
    .catch((err) => done(err));
});
