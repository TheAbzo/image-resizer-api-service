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
const fs_1 = __importDefault(require("fs"));
const routes = express_1.default.Router();
function waitForFileExists(filePath, currentTime = 0, timeout = 5000) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs_1.default.existsSync(filePath))
            return true;
        if (currentTime === timeout)
            return false;
        // wait for 1 second
        yield new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000));
        // waited for 1 second
        return waitForFileExists(filePath, currentTime + 1000, timeout);
    });
}
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //checks for valid query, and valid width, height(above 0)
    if ((req.url.includes('?')) && Number(req.query.width) >= 0 && Number(req.query.height)) {
        //get query parameters
        const filename = (req.query.filename);
        const width = Number(req.query.width);
        const height = Number(req.query.height);
        const cachedName = `${filename}-${width}-${height}.jpg`;
        const images = ["encenadaport", "fjord", "icelandwaterfall", "palmtunnel", "santamonica"];
        //check if image exists in our server
        if (images.indexOf(filename) > -1) {
            console.log("i'm here 0");
            const name = (0, utilities_1.finalPathGenerator)(cachedName, width, height, filename);
            console.log("nameee is", name);
            const scaledImage = `scaled/${name}`;
            const finalPath = (0, path_1.resolve)(scaledImage);
            let paaa = finalPath.replace(/\\/g, "/");
            console.log("scaled image is", scaledImage);
            console.log("final path is", finalPath);
            console.log("paaa path is", paaa);
            let x = paaa.replace("build/", '');
            console.log("xxxxxxxxxxx", x);
            //convert \ to /
            let c = "D:" + '/' + "Projects - Abzo" + '/' + "image-resizer-api" + '/' + "scaled" + '/' + "santamonica-200-400.jpg";
            //final path:  D:\Projects - Abzo\image-resizer-api\build\scaled\santamonica-200-400.jpg
            waitForFileExists(x).then(() => {
                console.log("sending status");
                //send image with status code 200
                res.status(200).sendFile(x);
            });
            // if (fs.existsSync(x)){
            //     console.log("sending status")
            //     //send image with status code 200
            //     res.status(200).sendFile(x);
            // }
        }
        else {
            console.log("failed to send status");
            //filename wrong/doesn't exist in image folder
            res.send("Incorrect filename parameter value OR image name doesn't exist.  Please use one of these images:- encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.");
        }
    }
    else {
        console.log("are u lost");
        res.send("please enter a valid url parameters");
    }
    console.log("im lost");
}));
exports.default = routes;
