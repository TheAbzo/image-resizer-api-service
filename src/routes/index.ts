import { finalPathGenerator, waitForFileExists } from './utilities';
import { resolve } from 'path';
import express from 'express';

const routes = express.Router();

routes.get('/', async (req, res) => {
    //checks for valid query, and valid width, height(above 0)
    if (req.url.includes('?') && Number(req.query.width) >= 0 && Number(req.query.height)) {
        //get query parameters
        const filename: string = req.query.filename as string;
        const width: number = Number(req.query.width);
        const height: number = Number(req.query.height);
        const cachedName: string = `${filename}-${width}-${height}.jpg`;
        const images: string[] = [
            'encenadaport',
            'fjord',
            'icelandwaterfall',
            'palmtunnel',
            'santamonica'
        ];

        //check if image exists in our server
        if (images.indexOf(filename) > -1) {
            const name = finalPathGenerator(cachedName, width, height, filename);
            const scaledImage = `scaled/${name}`;
            const finalPath = resolve(scaledImage);
            let finalPathSlashed = finalPath.replace(/\\/g, '/');
            let finalPathFixed = finalPathSlashed.replace('build/', '');

            waitForFileExists(finalPathFixed).then(() => {
                //send image with status code 200
                res.status(200).sendFile(finalPathFixed);
            });
        } else {
            //filename wrong/doesn't exist in image folder
            res.send(
                "Incorrect filename parameter value OR image name doesn't exist.  Please use one of these images:- encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica."
            );
        }
    } else {
        res.send('please enter a valid url parameters');
    }
});

export default routes;
