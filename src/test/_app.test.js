const request = require('supertest');

// Mock specific routes that might fail due to missing environment variables during tests
jest.mock('../routes/music.routes', () => {
    const express = require('express');
    return express.Router();
});
jest.mock('../routes/auth.routes', () => {
    const express = require('express');
    return express.Router();
});

const app = require('../app');

describe("App Level Routing Edge Cases", () => {
    
    describe("GET /", () => {
        it("should return 404 Not Found since the root endpoint is not explicitly defined", async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(404);
        });
    });

    describe("Unknown Endpoints", () => {
        it("should return 404 Not Found for undefined GET endpoints", async () => {
            const res = await request(app).get('/api/random-non-existent-route');
            expect(res.status).toBe(404);
        });

        it("should return 404 Not Found for undefined POST endpoints", async () => {
            const res = await request(app).post('/api/unknown-post');
            expect(res.status).toBe(404);
        });
    });

    describe("Middleware Edge Cases (express.json)", () => {
        it("should return 400 Bad Request when receiving malformed JSON payload", async () => {
            const res = await request(app)
                // Sending to a route, even if it might not exist, 
                // the express.json() middleware parses it first.
                .post('/api/music/random-route') 
                .set('Content-Type', 'application/json')
                .send('{"badJSON": "missing-quote, malformed}');
            
            expect(res.status).toBe(400);
        });
    });

});