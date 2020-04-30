import axios from 'axios'
export function request(options) {
    return new Promise((resolve,reject)=>{
        const instance = axios.create({
            baseURL: 'http://106.54.54.237:8000/api/h8',
            timeout:5000
        })  
        instance.interceptors.response.use(res=>{
            return res.data
    })
    
    instance(options)
        .then(res => {
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
        
    })
}