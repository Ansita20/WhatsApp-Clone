import express from 'express';
import connection from './db/database.js'
import route from './routes/route.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();

app.use(cors());
app. use (bodyParser.json({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/',route);

connection();
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is runnning successfully on PORT ${PORT}`))