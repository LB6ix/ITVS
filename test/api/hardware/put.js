process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Put /api/hardware/', (done) => {
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

it('administratorius turėtų redaguoti aparatinės įrangos įrašą', (done) => {
  request(app)
    .put('/api/hardware/edit/60a78c47618c5319448aa13b')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      name: 'MNT-0004',
      serialNumber: 'EditSM525NG235XA',
      model: '23E640',
      manufacturer: 'Samsung',
      category: 'Monitoriai',
      status: 'Paruoštas',
      cost: '123'
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('name');
      expect(body).to.contain.property('serialNumber');
      expect(body).to.contain.property('manufacturer');
      expect(body).to.contain.property('model');
      expect(body).to.contain.property('category');
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('cost');
      expect(body).to.contain.property('supplier');
      expect(body).to.contain.property('assigned');
      expect(body).to.contain.property('checkOutDate');
      expect(body).to.contain.property('expectedCheckInDate');
      expect(body).to.contain.property('checkInDate');
      expect(body).to.contain.property('comments');
      done();
    })
    .catch((err) => done(err));
});

it('administratorius turėtų priskirti aparatinės įrangos įrašą', (done) => {
  request(app)
    .put('/api/hardware/60923a89e73ac24e585a123c/checkout')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      assignedTo: '609703cb9cbd87220cdf24cc',
      checkOutDate: '2021-05-15T20:07:14.769Z',
      expectedCheckInDate: '2021-05-30T20:07:14.769'
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('name');
      expect(body).to.contain.property('serialNumber');
      expect(body).to.contain.property('manufacturer');
      expect(body).to.contain.property('model');
      expect(body).to.contain.property('category');
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('cost');
      expect(body).to.contain.property('supplier');
      expect(body).to.include({
        assignedTo: '609703cb9cbd87220cdf24cc'
      });
      expect(body).to.include({
        checkOutDate: '2021-05-15T20:07:14.769Z'
      });
      expect(body).to.contain.property('expectedCheckInDate');
      expect(body).to.contain.property('checkInDate');
      expect(body).to.contain.property('comments');
      done();
    })
    .catch((err) => done(err));
});

it('administratorius turėtų atsiimti aparatinės įrangos įrašą', (done) => {
  request(app)
    .put('/api/hardware/60a78c47618c5319448aa13b/checkin')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      status: 'Paruoštas',
      checkInDate: '2021-05-18T20:07:14.769'
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('name');
      expect(body).to.contain.property('serialNumber');
      expect(body).to.contain.property('manufacturer');
      expect(body).to.contain.property('model');
      expect(body).to.contain.property('category');
      expect(body).to.include({ status: 'Paruoštas' });
      expect(body).to.contain.property('cost');
      expect(body).to.contain.property('supplier');
      expect(body).to.contain.property('assigned', false);
      expect(body).to.contain.property('checkOutDate');
      expect(body).to.contain.property('expectedCheckInDate');
      expect(body).to.contain.property('checkInDate');
      expect(body).to.contain.property('comments');
      done();
    })
    .catch((err) => done(err));
});
