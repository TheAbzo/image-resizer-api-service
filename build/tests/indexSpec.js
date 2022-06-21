"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
// import { response } from 'express';
const request = (0, supertest_1.default)(index_1.default);
describe("suite for testing the image endpoint response", () => {
    //done for supertest to tell when our endpoint is done to disconnect from server
    it('Server is up', () => __awaiter(void 0, void 0, void 0, function* () {
        const respone = yield request.get('/api/images?filename=fjord&width=50&height=50');
        expect(respone.status).toBe(200);
    }));
    // done();
});
