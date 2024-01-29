import { log } from "console";
import File from "../models/file.js";
import Files from "../models/files.js";
import archiver from "archiver";
import fs from 'fs'
export const uploadImage=async(req,res)=>{
    try {
        var filesObj={files :[]}
        
        for (const file of req.files) {
             let fileObj={
                path:file.path,
                name:file.originalname
            }
           
            
           
            // console.log(fileResponse);
            filesObj.files.push(fileObj)
            
            

            
        };
      
        
    
        const filesResp=await Files.create(filesObj)
      
        res.status(200).json({path:`/files/${filesResp._id}`})

    } catch (error) {
        console.log(error);
        
    }
    

}

export const downloadImages=async(req,res)=>{
    console.log('download');
    
    try {
        const files=await Files.findById(req.params.filesId);
        
       files.downloadContent++;
    
       await files.save();
    if(files.files.length==1){
        return res.download(files.files[0].path,files.files[0].name)
    }
       const archive = archiver("zip", {
        zlib: { level: 9 }, // set compression level
      });
  
      archive.on("error", (err) => {
        throw err;
      });
  
    
      res.attachment(`download_${files._id}.zip`);
      archive.pipe(res);
  
     
      for (const file of files.files) {
        const fileStream = fs.createReadStream(file.path);
        archive.append(fileStream, { name: file.name });
      }
  
      
      archive.finalize();
    
       
        
    } catch (error) {
        console.log('error while downloading',error);
        return res.status(500).json({error:error.message})
        
    }
  

}
