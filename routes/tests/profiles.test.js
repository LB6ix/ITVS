const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);

it('Gets the profile/me endpoint', async (done) => {
  const res = await request.get('api/profile/me');

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Success!');
  done();
});
