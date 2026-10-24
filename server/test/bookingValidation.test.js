const { after, before, describe, it } = require('node:test');
const assert = require('node:assert/strict');

process.env.DB_HOST ||= 'localhost';
process.env.DB_USER ||= 'test';
process.env.DB_PASSWORD ||= 'test';
process.env.DB_NAME ||= 'flavourhub_db';

const app = require('../app');
const server = app.listen(0);
let baseUrl;

before(() => {
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => new Promise((resolve, reject) => {
  server.close((error) => (error ? reject(error) : resolve()));
}));

describe('booking API validation', () => {
  it('rejects missing booking fields without contacting MySQL', async () => {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.success, false);
    assert.deepEqual(Object.keys(body.errors).sort(), [
      'booking_date',
      'email',
      'name',
      'persons',
      'phone',
    ]);
  });

  it('rejects invalid phone numbers, party sizes, and dates', async () => {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Guest',
        phone: '123',
        email: 'guest@example.com',
        persons: 7,
        booking_date: '2026-02-30',
      }),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.success, false);
    assert.deepEqual(Object.keys(body.errors).sort(), ['booking_date', 'persons', 'phone']);
  });

  it('returns a JSON 404 for unknown API routes', async () => {
    const response = await fetch(`${baseUrl}/api/not-found`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.success, false);
    assert.equal(body.message, 'Route not found');
  });
});
