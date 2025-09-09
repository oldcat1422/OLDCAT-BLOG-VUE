//1、引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus';
import router from '../router'
//2、创建axios对象
const service = axios.create({
    baseURL:'http://localhost:8088'
})

//3、请求拦截器 ==> 前端给后端发送数据
service.interceptors.request.use(config =>{
    config.headers.Authorization = localStorage.getItem("token");
    // console.log("token存进去了",config.headers.Authorization);
    
    return config;
}), error =>{
    Promise.reject(error);
};

//4、响应拦截器 ==> 后端给前端返回数据
service.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            ElMessage.error("token已过期，请重新登录")
            localStorage.removeItem("token")
            router.push('/login')
        }
        return response.data
    },
    error =>{
        error.response && ElMessage.error("出错了")
        return Promise.reject('error')
    }
)
export default service
