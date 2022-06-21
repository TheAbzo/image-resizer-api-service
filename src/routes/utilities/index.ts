import sharp, { bool } from 'sharp';
import {resolve} from 'path';
import fs from 'fs'
import { Console } from 'console';




export const resizing = (imageName:string, width:number, height:number): boolean => {

        const imageLocation:string = `${imageName}.jpg`
        const inputFile:string = `images/${imageLocation}`
        const scaledNamed:string = `scaled/${imageName}-${width}-${height}.jpg`
        let success = true

        
        sharp(inputFile)
            .resize(width, height)
            .toFile(scaledNamed).then(()=>{
                return true
              })
        return success
}

//fn takes name,width, height,path, returns path(checks if file in cache or not)
export function finalPathGenerator(fileNameFormatted:string, width:number, height:number, fileName:string):string {

    //get absolute path of cache.json
    let cachedName = "src/routes/utilities/cache.json"; 

    //read cache
    let data = fs.readFileSync(cachedName);
    let cachedInJSON: JSON = JSON.parse(data.toString());
    let tostringpls = `${fileNameFormatted}`

    //check if it is cached
    if (cachedInJSON.hasOwnProperty(fileNameFormatted)) {

        console.log("Abzo: im cached")
        return fileNameFormatted
    } else {
        console.log("Abzo: im not cached")
        const x = resizing(fileName, width, height)
        console.log("doesnt have")
        let newData = {
            [fileNameFormatted]: []
        }  
        let newJson = {...cachedInJSON, ...newData}
        console.log("dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log("ssssSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSssssssss",x)
        fs.writeFileSync(cachedName, JSON.stringify(newJson));
        return fileNameFormatted
    }
}