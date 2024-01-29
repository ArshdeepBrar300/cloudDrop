import axios from 'axios'

const API_URL= '';
export const uploadFile=async(data)=>{
    try{
        const response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    }
    catch(err){
        console.log('Error while calling api',err.message);
    }
}