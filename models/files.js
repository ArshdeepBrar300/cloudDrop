import mongoose from "mongoose";
import File from "./file.js";
import { fileSchema } from "./file.js";
 const filesSchema=new mongoose.Schema({
    files:[{
        type: fileSchema
    }],
    downloadContent:{
        type:Number,
        required:true,
        default:0
    }
})

const Files=mongoose.model('files',filesSchema);

export default Files