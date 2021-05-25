process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server.js');
const conn = require('../../../config/db.js');

describe('Get /api/software/', (done) => {
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

it('administratorius turėtų gauti programinės įrangos sąrašą', (done) => {
  request(app)
    .get('/api/software/')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .then((res) => {
      const body = res.body;
      //expect(body).to.be.have.key('items');
      expect(body).to.be.an('array');
      expect(body.length).to.be.above(1);
      done();
    })
    .catch((err) => done(err));
});

it('darbuotojas turėtų gauti klaidą, bandant gauti visą programinės įrangos sąrašą', (done) => {
  request(app)
    .get('/api/software/')
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

it('administratorius turėtų gauti programinę įrangą pagal ID', (done) => {
  request(app)
    .get('/api/software/single/60934efe39935b09bc5c0d5d')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5NWMzN2QwZTM1OTI0YjU0MTE0MDYzIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTYyMTY5MDA4MywiZXhwIjoxNjIyMDUwMDgzfQ.4BUBqzmE3t5a0Y74vmhobr6AILgrU5yzUxsclvRm0ag'
    )
    .then((res) => {
      const body = res.body;
      expect(body).to.be.an('array');
      expect(body.length).to.equal(1);
      const checkReturnedAssetId = body.map((x) => ({
        _id: x._id
        // assigned: x.assigned
        // // name: x.name,
        // // serialNumber: x.serialNumber,
        // // manufacturer: x.manufacturer,
        // // model: x.model,
        // // category: x.category,
        // // location: x.location,
        // // supplier: x.supplier,
        // // cost: x.cost
      }));
      expect(checkReturnedAssetId).to.deep.include({
        _id: '60934efe39935b09bc5c0d5d'
      });
      done();
    })
    .catch((err) => done(err));
});
