import sharp from 'sharp';
import {resolve} from 'path';


export function resizing(imageName:string, width:number, height:number, pathWitheExtenstion:string) :boolean{
    const imageLocation:string = `${imageName}.jpg`
    const inputFile:string = `images/${imageLocation}`
    const scaledNamed:string = `scaled/${imageName}-${width}-${height}.jpg`
    
    sharp(inputFile)
        .resize(width, height)
        .toFile(scaledNamed).then(() => true)
    
    return false
}

export function sendImage(){

}