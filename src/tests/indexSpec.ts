import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('suite for testing the image endpoint response', (): void => {
    it('/api/images endpoint works well', async (): Promise<void> => {
        const respone = await request.get('/api/images?filename=fjord&width=50&height=50');
        expect(respone.status).toBe(200);
    });
});
