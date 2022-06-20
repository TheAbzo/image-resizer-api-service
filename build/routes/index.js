"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
// //creating an end point
// app.get('/abzo',(req, res) =>{
//     res.send('hello Abzo ds ');
// });
routes.get('/', (req, res) => {
    res.send('main api route');
});
//get query parameters
//utilities function that has resizing --another folder
//check if path exists
//return image
//else respond with utility function result
//save it locally
exports.default = routes;
