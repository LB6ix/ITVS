process.env.NODE.ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../server');
const conn = require('../../../config/db.js');

describe('Post /api/profile/', (done) => {
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

it('turėtų sukurti arba pakeisti profilį prisijungusiam naudotojui', (done) => {
  request(app)
    .post('/api/profile/')
    .set('Content-Type', 'application/json')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhODBkOTFmN2Y2M2EyMjQ4Njc0MGQ1Iiwicm9sZSI6Im1lbWJlciJ9LCJpYXQiOjE2MjE3OTYzMTAsImV4cCI6MTYyNTM5NjMxMH0.wS8ftHZEoCOjTuD4rQFGjJpLHHioAWDWts8Ooie-NzQ'
    )
    .send({
      title: 'Praktikantas',
      department: 'IT skyrius',
      phoneNumber: '+37055542421',
      company: 'Telia',
      location: 'Kaunas'
    })

    .then((res) => {
      if (
        res.headers['Content-Type'] == 'application/json' &&
        res.body === undefined
      ) {
        res.body = JSON.parse(res.text);
      }
      const body = res.body;
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('user');
      expect(body).to.contain.property('title');
      expect(body).to.contain.property('department');
      expect(body).to.contain.property('phoneNumber');
      expect(body).to.contain.property('company');
      expect(body).to.contain.property('location');
      expect(body).to.contain.property('date');
      done();
    })
    .catch((err) => done(err));
});
