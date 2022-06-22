"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalPathGenerator = exports.resizing = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
/**
 * @description resizing image takes images name with the width and height to be resized into
 * @param imageName
 * @param width
 * @param height
 * @returns
 */
const resizing = (imageName, width, height) => {
    const imageLocation = `${imageName}.jpg`;
    //get absolute path of input file
    const inputFile = (0, path_1.resolve)(`images/${imageLocation}`);
    const inputImage = inputFile.replace("build\\", '');
    console.log("imaaaaaaaaaaaaaaage", inputImage);
    console.log("input FIle is ----------", inputFile);
    const scaledNamed = (0, path_1.resolve)(`scaled/${imageName}-${width}-${height}.jpg`);
    let scaledNamedWithoutBuild = scaledNamed.replace("build\\", '');
    console.log('TIREDDDDDDDDDDDDDDDDDDDDDDDDDDD_----', scaledNamedWithoutBuild);
    console.log("Saving in", scaledNamed);
    let success = true;
    (0, sharp_1.default)(inputImage.replace(/\\/g, "/"))
        .resize(width, height)
        .toFile(scaledNamedWithoutBuild).then(() => {
        return true;
    });
    return success;
};
exports.resizing = resizing;
/**
 * function checks for image name in the cache file, and creates it if it doesn't exist.
 * @param fileNameFormatted
 * @param width
 * @param height
 * @param fileName
 * @returns
 */
function finalPathGenerator(fileNameFormatted, width, height, fileName) {
    //get absolute path of cache.json
    //D:\Projects - Abzo\image-resizer-api\cache.json
    //src/routes/utilities/
    // const cachedName:string = resolve('cache.json'); 
    //crashes on file: D:\\Projects - Abzo\\image-resizer-api\\build\\cache.json
    //convert \ to /  (make sure its \ not \\)
    // const cachedName:string = resolve('D:/Projects - Abzo/image-resizer-api/cache.json'); 
    // const test = cachedName.replace(/\\/g, "/");
    //
    //our file: D:/Projects - Abzo/image-resizer-api/cache.json
    const cachedName = (0, path_1.resolve)("cache.json");
    const test = cachedName.replace(/\\/g, "/");
    const test2 = test.replace("build/", '');
    console.log("tesssst", test2);
    console.log("cacheName is", cachedName);
    //read cache
    const data = fs_1.default.readFileSync(test2);
    const cachedInJSON = JSON.parse(data.toString());
    console.log("json is", cachedInJSON);
    //check if it is cached
    console.log("i'm here start");
    if (Object.prototype.hasOwnProperty.call(cachedInJSON, fileNameFormatted)) {
        console.log("i'm here 1");
        return fileNameFormatted;
    }
    else {
        console.log("i'm here 2");
        //resizing image
        (0, exports.resizing)(fileName, width, height);
        //data to be added to cache file
        const newData = {
            [fileNameFormatted]: []
        };
        //merge new data with older cache
        const newJson = Object.assign(Object.assign({}, cachedInJSON), newData);
        //saving and return
        fs_1.default.writeFileSync(cachedName, JSON.stringify(newJson));
        return fileNameFormatted;
    }
}
exports.finalPathGenerator = finalPathGenerator;
