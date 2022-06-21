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
const express_1 = __importDefault(require("express"));
const utilities_1 = require("./utilities");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const routes = express_1.default.Router();
// //creating an end point
// app.get('/abzo',(req, res) =>{
//     res.send('hello Abzo ds ');
// });
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((req.query) === {}) {
        res.send("please enter a valid url parameters");
    }
    else {
        //get query parameters
        const filename = (req.query.filename);
        const inputFileName = `${filename}`;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        const path = "/api/images" + `?filename=${filename}&width=${width}&height=${height}`;
        const cachedName = `${filename}-${width}-${height}.jpg`;
        //check if image exists in our server
        let images = ["encenadaport", "fjord", "icelandwaterfall", "palmtunnel", "santamonica"];
        if (images.indexOf(filename) > -1) {
            //in the array
            const name = (0, utilities_1.finalPathGenerator)(cachedName, width, height, filename);
            const ppp = `scaled/${name}`;
            const finalPath = (0, path_1.resolve)(ppp);
            console.log("second?");
            if (fs_1.default.existsSync(finalPath)) {
                // ...
                res.status(200).sendFile(finalPath);
                //   res.sendFile(finalPath)
            }
        }
        else {
            //not in it
            res.send("Incorrect filename parameter value OR image name doesn't exist.  Please use one of these images:- encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.");
        }
    }
}));
exports.default = routes;
