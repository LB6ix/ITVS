process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Post /api/hardware/', (done) => {
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

it('administratorius turėtų sukurti aparatinės įrangos įrašą', (done) => {
  request(app)
    .post('/api/hardware/add-hardware')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      name: 'Test asset',
      serialNumber: 'TestSN123',
      manufacturer: 'TestManu',
      model: 'TestModel',
      category: 'Kompiuteriai',
      location: 'TestLocation',
      status: 'Paruoštas',
      cost: '123',
      supplier: 'TestSupplier'
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
