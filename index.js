import express from "express";
// import router  from "./routes/routes.js";
import cors from 'cors'

import path from 'path'

import dbConnection from "./database/db.js";
import dotenv from 'dotenv';
import router from "./routes/routes.js";

dotenv.config();
const app=express()
const __dirname=path.resolve();


const PORT = process.env.PORT || 8000;
dbConnection()
app.use(cors())
const corsConfig = {
    origin: '',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.use(express.urlencoded({ extended: true }));

app.use('/',router)
app.use(express.static(path.join(__dirname,"./client/build")))
app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
        res.status(500).send(err);
    })

})

// const router=express.Router();




app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
