import sharp from 'sharp';
import fs from 'fs';

/**
 * @description resizing image takes images name with the width and height to be resized into
 * @param imageName 
 * @param width 
 * @param height 
 * @returns 
 */
export const resizing = (imageName:string, width:number, height:number): boolean => {

        const imageLocation:string = `${imageName}.jpg`;
        const inputFile:string = `images/${imageLocation}`;
        const scaledNamed:string = `scaled/${imageName}-${width}-${height}.jpg`;
        let success:boolean = true;
        
        sharp(inputFile)
            .resize(width, height)
            .toFile(scaledNamed).then(()=>{
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
    const cachedName:string = "src/routes/utilities/cache.json"; 

    //read cache
    const data:Buffer = fs.readFileSync(cachedName);
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