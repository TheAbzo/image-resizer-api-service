import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

//create the server
app.listen(port);

//using middleware for our endpoint
app.use('/api/images', routes);

export default app;
