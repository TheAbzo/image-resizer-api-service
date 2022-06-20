import express from 'express';
import { resizing,finalPathGenerator } from './utilities';
import {resolve} from 'path';

const routes = express.Router();

// //creating an end point
// app.get('/abzo',(req, res) =>{
//     res.send('hello Abzo ds ');
// });

routes.get('/',(req, res) =>{

    if((req.query) === {}){

        res.send("please enter a valid url parameters")
    }else{
        //get query parameters
    const filename:string = (req.query.filename) as string;
    const inputFileName:string = `${filename}`;
    const width:number = Number(req.query.width);
    const height:number = Number(req.query.height);
    const path = "/api/images" + `?filename=${filename}&width=${width}&height=${height}`
    const cachedName:string = `${filename}-${width}-${height}.jpg`

    //check if image exists in our server

    if(filename ===''){
        //return error
    }else{
        //fn takes name,width, height,path, returns path(checks if file in cache or not)

        //inside the function
        // resizing(inputFileName, width, height);

      //  console.log("should be an image");
        // res.sendStatus(200)
        //with file system read and send
    }

    finalPathGenerator(cachedName,width,height,filename)
    const finalPath = resolve('images/fjord.jpg')
    res.sendFile(finalPath);


    
   // res.send('main api route');
    }
    
});
//check if path exists
//return image
//else respond with utility function result
//save it locally


export default routes;