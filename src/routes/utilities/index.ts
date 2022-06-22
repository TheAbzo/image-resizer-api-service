import sharp from 'sharp';
import fs from 'fs';
import {resolve} from 'path';

/**
 * function that awaits till image file is processed
 * @param filePath 
 * @param currentTime 
 * @param timeout 
 * @returns 
 */
export async function waitForFileExists(filePath:string, currentTime:number = 0, timeout:number = 5000): Promise<boolean> {
    if (fs.existsSync(filePath)) return true;
    if (currentTime === timeout) return false;

    //wait for 1 second
    await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

    //waited for 1 second
    return waitForFileExists(filePath, currentTime + 1000, timeout);
  }

/**
 * @description resizing image takes images name with the width and height to be resized into
 * @param imageName 
 * @param width 
 * @param height 
 * @returns 
 */
export function resizing(imageName:string, width:number, height:number): boolean {

        const imageLocation:string = `${imageName}.jpg`;
        const inputFile:string = resolve(`images/${imageLocation}`);
        const inputImage = inputFile.replace("build\\",'')
        const scaledNamed:string = resolve(`scaled/${imageName}-${width}-${height}.jpg`);
        const scaledNamedWithoutBuild = scaledNamed.replace("build\\",'')
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

    const cachedName:string = resolve("cache.json"); 
    const cachedNameSlashed = cachedName.replace(/\\/g, "/");
    const cachedNameAdjusted = cachedNameSlashed.replace("build/",'');

    //read cache
    const data:Buffer = fs.readFileSync(cachedNameAdjusted);
    const cachedInJSON:JSON = JSON.parse(data.toString());

    //check if it is cached
    if (Object.prototype.hasOwnProperty.call(cachedInJSON,fileNameFormatted)) {
        return fileNameFormatted;
    } else {

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