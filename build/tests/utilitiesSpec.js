"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../routes/utilities/index");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
describe("suite for testing the resizing function", () => {
    //done for supertest to tell when our endpoint is done to disconnect from server
    it("Testing on Image processing fjord of 50:50 dimensions", () => {
        const data = (0, index_1.resizing)("fjord", 50, 50);
        expect(data).toBe(true);
    });
    it("Testing on image output resized file", () => {
        const data = (0, index_1.resizing)("fjord", 50, 50);
        let result = fs_1.default.existsSync((0, path_1.resolve)("scaled/fjord-50-50.jpg"));
        expect(result).toBe(true);
    });
});
