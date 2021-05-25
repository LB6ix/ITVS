process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Post /api/software/', (done) => {
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

it('administratorius turėtų sukurti programinės įrangos įrašą', (done) => {
  request(app)
    .post('/api/software/add-software')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .send({
      license: 'Test License11',
      key: 'TestKey123',
      expDate: '2021-05-31T00:00:00.000+00:00',
      manufacturer: 'TestManu',
      status: 'Neaktyvi',
      totalAmount: '1',
      cost: '123',
      supplier: 'TestSupplier'
    })
    .then((res) => {
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('license');
      expect(body).to.contain.property('key');
      expect(body).to.contain.property('manufacturer');
      expect(body).to.contain.property('status');
      expect(body).to.contain.property('totalAmount');
      expect(body).to.contain.property('cost');
      expect(body).to.contain.property('supplier');
      done();
    })
    .catch((err) => done(err));
});
