"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
//create the server
app.listen(port, () => {
    console.log(`server has started at localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Service is on "/api/images". please provide filename="name"&width=00&height=00');
});
app.use('/api/images', index_1.default);
exports.default = app;
