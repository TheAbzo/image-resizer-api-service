"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalPathGenerator = exports.resizing = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resizing = (imageName, width, height) => {
    const imageLocation = `${imageName}.jpg`;
    const inputFile = `images/${imageLocation}`;
    const scaledNamed = `scaled/${imageName}-${width}-${height}.jpg`;
    let success = true;
    (0, sharp_1.default)(inputFile)
        .resize(width, height)
        .toFile(scaledNamed).then(() => {
        return true;
    });
    return success;
};
exports.resizing = resizing;
//fn takes name,width, height,path, returns path(checks if file in cache or not)
function finalPathGenerator(fileNameFormatted, width, height, fileName) {
    //get absolute path of cache.json
    let cachedName = "src/routes/utilities/cache.json";
    //read cache
    let data = fs_1.default.readFileSync(cachedName);
    let cachedInJSON = JSON.parse(data.toString());
    let tostringpls = `${fileNameFormatted}`;
    //check if it is cached
    if (cachedInJSON.hasOwnProperty(fileNameFormatted)) {
        console.log("Abzo: im cached");
        return fileNameFormatted;
    }
    else {
        console.log("Abzo: im not cached");
        const x = (0, exports.resizing)(fileName, width, height);
        console.log("doesnt have");
        let newData = {
            [fileNameFormatted]: []
        };
        let newJson = Object.assign(Object.assign({}, cachedInJSON), newData);
        console.log("dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log("ssssSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSssssssss", x);
        fs_1.default.writeFileSync(cachedName, JSON.stringify(newJson));
        return fileNameFormatted;
    }
}
exports.finalPathGenerator = finalPathGenerator;
