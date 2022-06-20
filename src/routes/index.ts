import express from 'express';

const routes = express.Router();

// //creating an end point
// app.get('/abzo',(req, res) =>{
//     res.send('hello Abzo ds ');
// });

routes.get('/',(req, res) =>{
    res.send('main api route');
});
//get query parameters
//utilities function that has resizing --another folder
//check if path exists
//return image
//else respond with utility function result
//save it locally


export default routes;