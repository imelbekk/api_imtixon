import axios from "axios";

const axiosCleint = axios.create({
    baseURL: 'http://34.143.212.163:3000/api'   
})

axiosCleint.interceptors.request.use((config)=>{
    let token = localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
},function(err){
    return Promise.reject(err)
}
)

export default axiosCleint