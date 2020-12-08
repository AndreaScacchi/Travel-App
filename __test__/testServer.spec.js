const app = require('../src/server/server.js');
const superTest = require('superTest');
const request = superTest(app);

describe('Test Endpoint', () => {
    it('/test', async (done) => {
        const response = await request.get('/test');
        expect(response.status).toBe(200);
        done();
    });
});
