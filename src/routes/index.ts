import express from 'express';
import {finalPathGenerator } from './utilities';
import {resolve} from 'path';
import fs from 'fs'

const routes = express.Router();


routes.get('/',async (req, res) =>{

    if((req.url.includes('?')) && Number(req.query.width) >= 0  && Number(req.query.height) ){

       
        //get query parameters
    const filename:string = (req.query.filename) as string;
    const inputFileName:string = `${filename}`;
    const width:number = Number(req.query.width);
    const height:number = Number(req.query.height);
    const path = "/api/images" + `?filename=${filename}&width=${width}&height=${height}`
    const cachedName:string = `${filename}-${width}-${height}.jpg`

    //check if image exists in our server
    let images:string[] = ["encenadaport","fjord","icelandwaterfall","palmtunnel","santamonica"]

    if(images.indexOf(filename) > -1){
        //in the array
        const name = finalPathGenerator(cachedName,width,height,filename)
        const ppp = `scaled/${name}`
        const finalPath = resolve(ppp)
    
        console.log(finalPath) 
    
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