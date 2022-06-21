import sharp, { bool } from 'sharp';
import fs from 'fs'




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

    //check if it is cached
    if (cachedInJSON.hasOwnProperty(fileNameFormatted)) {

        return fileNameFormatted
    } else {
        console.log("Abzo: im not cached")
        const x = resizing(fileName, width, height)
        let newData = {
            [fileNameFormatted]: []
        }  
        let newJson = {...cachedInJSON, ...newData}
        fs.writeFileSync(cachedName, JSON.stringify(newJson));
        return fileNameFormatted
    }
}