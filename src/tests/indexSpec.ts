import app from '../index'
import supertest from 'supertest'

const request = supertest(app);

describe("suite for testing the image endpoint response", () => {
    //done for supertest to tell when our endpoint is done to disconnect from server
    it('Server is up', async (done)=>{
        const response = await request.get('/api/images');
        expect(response.status).toBe(200);
        done();
    })
})