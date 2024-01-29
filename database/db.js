import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const dbConnection=async()=>{
    const USERNAME = process.env.DB_USERNAME;
    const PASSWORD = process.env.DB_PASSWORD;
    const MONGODB_URL=`mongodb+srv://${USERNAME}:${PASSWORD}@file-share.fbkst7m.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(MONGODB_URL,{useNewUrlParser:true})
        console.log('Successfully connected to mongodb');
        
    } catch (error) {
        console.log('error while connecting to database',error);
        
    }
}

export default dbConnection