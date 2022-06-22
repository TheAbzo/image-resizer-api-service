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
exports.finalPathGenerator = exports.resizing = exports.waitForFileExists = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
/**
 * function that awaits till image file is processed
 * @param filePath
 * @param currentTime
 * @param timeout
 * @returns
 */
function waitForFileExists(filePath, currentTime = 0, timeout = 5000) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs_1.default.existsSync(filePath))
            return true;
        if (currentTime === timeout)
            return false;
        //wait for 1 second
        yield new Promise((resolve) => setTimeout(() => resolve(true), 1000));
        //waited for 1 second
        return waitForFileExists(filePath, currentTime + 1000, timeout);
    });
}
exports.waitForFileExists = waitForFileExists;
/**
 * @description resizing image takes images name with the width and height to be resized into
 * @param imageName
 * @param width
 * @param height
 * @returns
 */
function resizing(imageName, width, height) {
    const imageLocation = `${imageName}.jpg`;
    const inputFile = (0, path_1.resolve)(`images/${imageLocation}`);
    const inputImage = inputFile.replace('build\\', '');
    const scaledNamed = (0, path_1.resolve)(`scaled/${imageName}-${width}-${height}.jpg`);
    const scaledNamedWithoutBuild = scaledNamed.replace('build\\', '');
    let success = true;
    (0, sharp_1.default)(inputImage.replace(/\\/g, '/'))
        .resize(width, height)
        .toFile(scaledNamedWithoutBuild)
        .then(() => {
        return true;
    });
    return success;
}
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
    const cachedName = (0, path_1.resolve)('cache.json');
    const cachedNameSlashed = cachedName.replace(/\\/g, '/');
    const cachedNameAdjusted = cachedNameSlashed.replace('build/', '');
    //read cache
    const data = fs_1.default.readFileSync(cachedNameAdjusted);
    const cachedInJSON = JSON.parse(data.toString());
    //check if it is cached
    if (Object.prototype.hasOwnProperty.call(cachedInJSON, fileNameFormatted)) {
        return fileNameFormatted;
    }
    else {
        //resizing image
        resizing(fileName, width, height);
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
