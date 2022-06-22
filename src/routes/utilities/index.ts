import sharp from 'sharp';
import fs from 'fs';
import {resolve} from 'path';

/**
 * @description resizing image takes images name with the width and height to be resized into
 * @param imageName 
 * @param width 
 * @param height 
 * @returns 
 */
export const resizing = (imageName:string, width:number, height:number): boolean => {

        const imageLocation:string = `${imageName}.jpg`;
        //get absolute path of input file
        const inputFile:string = resolve(`images/${imageLocation}`);
        const inputImage = inputFile.replace("build\\",'')
        console.log("imaaaaaaaaaaaaaaage",inputImage)
        console.log("input FIle is ----------",inputFile)


        const scaledNamed:string = resolve(`scaled/${imageName}-${width}-${height}.jpg`);
        let scaledNamedWithoutBuild = scaledNamed.replace("build\\",'')
        console.log('TIREDDDDDDDDDDDDDDDDDDDDDDDDDDD_----', scaledNamedWithoutBuild)
        console.log("Saving in", scaledNamed)
        let success:boolean = true;
        
        sharp(inputImage.replace(/\\/g, "/"))
            .resize(width, height)
            .toFile(scaledNamedWithoutBuild).then(()=>{
                return true;
              })

        return success;
}

/**
 * function checks for image name in the cache file, and creates it if it doesn't exist.
 * @param fileNameFormatted 
 * @param width 
 * @param height 
 * @param fileName 
 * @returns 
 */
export function finalPathGenerator(fileNameFormatted:string, width:number, height:number, fileName:string):string {

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
    const cachedName:string = resolve("cache.json"); 
    const test = cachedName.replace(/\\/g, "/");
    const test2 = test.replace("build/",'')
    console.log("tesssst",test2)
    console.log("cacheName is", cachedName)

    //read cache
    const data:Buffer = fs.readFileSync(test2);
    const cachedInJSON:JSON = JSON.parse(data.toString());
    console.log("json is",cachedInJSON );

    //check if it is cached
    console.log("i'm here start");

    if (Object.prototype.hasOwnProperty.call(cachedInJSON,fileNameFormatted)) {
        console.log("i'm here 1")
        return fileNameFormatted;
    } else {

        console.log("i'm here 2")

        //resizing image
        resizing(fileName, width, height);

        //data to be added to cache file
        const newData = {
            [fileNameFormatted]: []
        };  
        
        //merge new data with older cache
        const newJson = {...cachedInJSON, ...newData};

        //saving and return
        fs.writeFileSync(cachedName, JSON.stringify(newJson));
        return fileNameFormatted;
    }
}