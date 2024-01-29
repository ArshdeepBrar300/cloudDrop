import mongoose from "mongoose";

export const fileSchema=new mongoose.Schema({
   
        path:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true
    },
   
})

const File=mongoose.model('file',fileSchema);
export default File