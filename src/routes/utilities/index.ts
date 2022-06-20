import sharp from 'sharp';
import {resolve} from 'path';
import fs from 'fs'


export function resizing(imageName:string, width:number, height:number) :boolean{
    const imageLocation:string = `${imageName}.jpg`
    const inputFile:string = `images/${imageLocation}`
    const scaledNamed:string = `scaled/${imageName}-${width}-${height}.jpg`
    
    sharp(inputFile)
        .resize(width, height)
        .toFile(scaledNamed).then(() => true)
    
    console.log("entered")
    return false
}

//fn takes name,width, height,path, returns path(checks if file in cache or not)
export function finalPathGenerator(fileNameFormatted:string, width:number, height:number, fileName:string):string {

    //get absolute path of cache.json
    let cachedName = "src/routes/utilities/cache.json"; 

    //read cache
    let data = fs.readFileSync(cachedName);
    let cachedInJSON: JSON = JSON.parse(data.toString());
    console.log(cachedInJSON)
    console.log(fileNameFormatted)
    let tostringpls = `${fileNameFormatted}`

    //check if it is cached
    if (cachedInJSON.hasOwnProperty(fileNameFormatted)) {
        console.log("has name")
        return fileNameFormatted
    } else {
        console.log("doesnt have")
        let newData = {
            [fileNameFormatted]: []
        }  
        let newJson = {...cachedInJSON, ...newData}
        resizing(fileName, width, height)
        fs.writeFileSync(cachedName, JSON.stringify(newJson));

        return fileNameFormatted



    }
   

     

    //inside the function
        // resizing(inputFileName, width, height);

      //  console.log("should be an image");
        // res.sendStatus(200)
        //with file system read and send
}