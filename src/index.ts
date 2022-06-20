import  express from "express";
// import routes from './routes/index'


const app = express();
const port = 3000;

// //creating an end point
// app.get('/abzo',(req, res) =>{
//     res.send('hello Abzo ds ');
// });

// routes as the middleware
// app.use('/api', routes);

//create the server
app.listen(port,()=>{
    console.log(`server has started at localhost:${port}`);
});
