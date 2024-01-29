import fileLogo from './assets/fileX.png'
import './App.css';
import { useEffect, useRef,useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from './services/api';
import uploadImg from './assets/upload.png'

function App() {

  const fileRef=useRef()
  const [loading,setLoading]=useState(false)
  const [resultLink,setRestultLink]=useState("")
 
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => {
        console.log(acceptedFiles);
        setUploadedFiles(acceptedFiles);
      },
    });
  
  const handleUpload=()=>{
    fileRef.current.click();}


  const uploadFileHandler=(files)=>{
    setLoading(true)
    setUploadedFiles(files)
    

  }
  const getImage=async()=>{
    if(uploadedFiles.length!=0){
      const data=new FormData();
      data.append("name",'uploadFile');
      Array.from(uploadedFiles).forEach( async (file)=>{
    
        data.append("files",file)
      })
      let response=await uploadFile(data)
      console.log(response);
        setRestultLink(response.path )
      
     
    

    }
    setLoading(false)
  }

  useEffect(()=>{
    
    getImage()
  },[uploadedFiles])

  return (
   
    <div className="container">
      <div className="navbar">
       Cloud Drop
    </div>
    <div className="body">
      <div className="glass-box"  >
        {resultLink=="" && loading==false && <div className='dragdrop'  {...getRootProps()}>
           <input  {...getInputProps()} />
              Drag & Drop a file
        
        </div>}
       
        <div class='upload-img'>
               <img  src={uploadImg} alt=""/>
        </div>
        <div className='result-link'>
        {loading && <h4>Uploading your files...</h4>}
          {resultLink!="" && <div>Your Link :</div>}
        <a href={resultLink} 
        target='_blank'
          rel="noreferrer">{resultLink}</a>
        </div>
      <div className='all-buttons'>
      <button onClick={handleUpload}>Upload</button>
        <input type='file' multiple="multiple" style={{display:'none'}} ref={fileRef} onChange={(file)=>uploadFileHandler(file.target.files)}/>
        {resultLink!=="" && <button onClick={()=>{setRestultLink('');setUploadedFiles([])}}>Remove</button>}

      </div>
       
      </div>
      
      <div className="bg-img">
          <img src={fileLogo} alt=""/>
      </div>
      
  
    </div>
  </div>
    
    
  
  );
}

export default App;
