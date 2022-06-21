import app from '../index'
import supertest from 'supertest'
// import { response } from 'express';

const request = supertest(app);

describe("suite for testing the image endpoint response", () => {
    //done for supertest to tell when our endpoint is done to disconnect from server
    it('/api/images endpoint works well', async ()=>{
        const respone = await request.get('/api/images?filename=fjord&width=50&height=50')
        
        expect(respone.status).toBe(200);
     
    })
    // done();
})
