import {resizing} from '../routes/utilities/index'
import fs from 'fs'
import {resolve} from 'path'

describe("suite for testing the resizing function", () => {
    //done for supertest to tell when our endpoint is done to disconnect from server
    it("Testing on Image processing fjord of 50:50 dimensions", () => {
        const data = resizing("fjord",50,50);
        expect(data).toBe(true);
    });

    it("Testing on image output resized file", () => {
        const data = resizing("fjord",50,50);
        let result = fs.existsSync(resolve("scaled/fjord-50-50.jpg"))
        
        expect(result).toBe(true);
    });
})
