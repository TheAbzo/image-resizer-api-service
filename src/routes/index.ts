import express from 'express';
import fs from 'fs'
import {finalPathGenerator } from './utilities';
import {resolve} from 'path';

const routes = express.Router();

routes.get('/',async (req, res) =>{

    //checks for valid query, and valid width, height(above 0)
    if((req.url.includes('?')) && Number(req.query.width) >= 0  && Number(req.query.height) ){

    //get query parameters
    const filename:string = (req.query.filename) as string;
    const width:number = Number(req.query.width);
    const height:number = Number(req.query.height);
    const cachedName:string = `${filename}-${width}-${height}.jpg`

    //check if image exists in our server
    const images:string[] = ["encenadaport","fjord","icelandwaterfall","palmtunnel","santamonica"]
    if(images.indexOf(filename) > -1){
        const name = finalPathGenerator(cachedName,width,height,filename)
        const scaledImage = `scaled/${name}`
        const finalPath = resolve(scaledImage)
    
            if (fs.existsSync(finalPath)) {
                // ...
                res.status(200).sendFile(finalPath)
                //   res.sendFile(finalPath)
    
              }
        
    }else{
      //not in it
      res.send("Incorrect filename parameter value OR image name doesn't exist.  Please use one of these images:- encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.")
    }
        
    }else{
        res.send("please enter a valid url parameters")
    }
    
});


export default routes;