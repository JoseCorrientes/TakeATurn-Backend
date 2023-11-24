import express from "express"
import routes from '../src/routes/index.route.js'
import 'dotenv/config' 
import { connectDB } from "./config/dbConnection.js";
import cors from 'cors'
;
let {PORT} = process.env;
let app = express();

app.use(cors({origin: '*'}))
app.use(express.json());
app.use('/', routes)

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})
connectDB();
