import {finalPathGenerator } from './utilities';
import {resolve} from 'path';
import express from 'express';
import fs from 'fs'

const routes = express.Router();

async function waitForFileExists(filePath:string, currentTime = 0, timeout = 5000): Promise<boolean> {
    if (fs.existsSync(filePath)) return true;
    if (currentTime === timeout) return false;
    // wait for 1 second
    await new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000));
    // waited for 1 second
    return waitForFileExists(filePath, currentTime + 1000, timeout);
  }

routes.get('/',async (req, res) =>{

    //checks for valid query, and valid width, height(above 0)
    if((req.url.includes('?')) && Number(req.query.width) >= 0  && Number(req.query.height)){

    //get query parameters
    const filename:string = (req.query.filename) as string;
    const width:number = Number(req.query.width);
    const height:number = Number(req.query.height);
    const cachedName:string = `${filename}-${width}-${height}.jpg`;
    const images:string[] = ["encenadaport","fjord","icelandwaterfall","palmtunnel","santamonica"];

    //check if image exists in our server
    if(images.indexOf(filename) > -1){
        console.log("i'm here 0");
        const name = finalPathGenerator(cachedName,width,height,filename);
        console.log("nameee is",name)
        const scaledImage = `scaled/${name}`;
        const finalPath = resolve(scaledImage);
        let paaa = finalPath.replace(/\\/g, "/");
        console.log("scaled image is",scaledImage)
        console.log("final path is",finalPath)
        console.log("paaa path is",paaa)
        let x =paaa.replace("build/",'')
        console.log("xxxxxxxxxxx",x)
        //convert \ to /
        let c = "D:"+'/'+"Projects - Abzo"+'/'+"image-resizer-api"+'/'+"scaled"+'/'+"santamonica-200-400.jpg"
        //final path:  D:\Projects - Abzo\image-resizer-api\build\scaled\santamonica-200-400.jpg

        waitForFileExists(x).then(()=>{
            console.log("sending status")
            //send image with status code 200
            res.status(200).sendFile(x);
        })
        // if (fs.existsSync(x)){

        //     console.log("sending status")
        //     //send image with status code 200
        //     res.status(200).sendFile(x);
        // }
    }else{
        console.log("failed to send status")
      //filename wrong/doesn't exist in image folder
      res.send("Incorrect filename parameter value OR image name doesn't exist.  Please use one of these images:- encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.")
    }       
    }else{
        console.log("are u lost")
        res.send("please enter a valid url parameters");
    }
    console.log("im lost")
});

export default routes;