import  express from "express";
import routes from './routes/index'


const app = express();
const port = 3000;

//create the server
app.listen(port,()=>{
    // console.log(`server has started at localhost:${port}`);
});

app.get('/',(req, res) =>{
    res.send('Service is on "/api/images". please provide filename=name&width=00&height=00');
});
app.use('/api/images', routes);

export default app;



