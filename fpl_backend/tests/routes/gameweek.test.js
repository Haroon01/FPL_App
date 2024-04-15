const request = require('supertest');
const app = require('../../server');

describe('GET /gameweek/homepage/data', () => {
    test('It should respond with an object containing current and next gameweek', async () => {
        const response = await request(app).get('/gameweek/homepage/data');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('current');
        expect(response.body).toHaveProperty('next');
    });
});