//1、引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus';
import router from '../router'
import store from '../store'

//2、创建axios对象
const service = axios.create({
    baseURL:'http://localhost:8088'
    // baseURL:'https://api.jinha.vip/'
})

//3、请求拦截器 ==> 前端给后端发送数据
service.interceptors.request.use(config =>{
    // 原代码：从 localStorage 获取 token
    // config.headers.Authorization = localStorage.getItem("token");
    
    // 新代码：从 Vuex store 获取 token
    config.headers.Authorization = store.getters['user/token'];
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
            // 原代码：直接操作 localStorage
            // localStorage.removeItem("token")
            
            // 新代码：使用 Vuex 清除用户信息
            store.dispatch('user/logout')
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
