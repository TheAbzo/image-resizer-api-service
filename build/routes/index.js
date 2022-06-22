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
const utilities_1 = require("./utilities");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //checks for valid query, and valid width, height(above 0)
    if (req.url.includes('?') && Number(req.query.width) >= 0 && Number(req.query.height)) {
        //get query parameters
        const filename = req.query.filename;
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        const cachedName = `${filename}-${width}-${height}.jpg`;
        const images = [
            'encenadaport',
            'fjord',
            'icelandwaterfall',
            'palmtunnel',
            'santamonica'
        ];
        //check if image exists in our server
        if (images.indexOf(filename) > -1) {
            const name = (0, utilities_1.finalPathGenerator)(cachedName, width, height, filename);
            const scaledImage = `scaled/${name}`;
            const finalPath = (0, path_1.resolve)(scaledImage);
            let finalPathSlashed = finalPath.replace(/\\/g, '/');
            let finalPathFixed = finalPathSlashed.replace('build/', '');
            (0, utilities_1.waitForFileExists)(finalPathFixed).then(() => {
                //send image with status code 200
                res.status(200).sendFile(finalPathFixed);
            });
        }
        else {
            //filename wrong/doesn't exist in image folder
            res.send("Incorrect filename parameter value OR image name doesn't exist.  Please use one of these images:- encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.");
        }
    }
    else {
        res.send('please enter a valid url parameters');
    }
}));
exports.default = routes;
