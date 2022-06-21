import  express from "express";
import routes from './routes/index'


const app = express();
const port = 3000;

//create the server
app.listen(port,()=>{
    console.log(`server has started at localhost:${port}`);
});

app.use('/api/images', routes);

export default app;
// routes as the middleware
// //creating an end point
// app.get('/api/images',(req, res) =>{
//     res.send('hello Abzo ds ');
// });



