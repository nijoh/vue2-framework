// 引入axios
import axios from 'axios';
import Vue from 'vue';
import router from '@/router/index'
const instance = axios.create({
    timeout: 10000 // 超时时间
})

//请求拦截
instance.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.headers = {
                "Content-Type": "application/json"
            };
            config.data = JSON.stringify(config.data);
        }
        const authorizationToken = Vue.prototype.$store.getters.getCurrentUser.authorizationToken;
        //携带Token
        if (authorizationToken) {
            config.headers.AuthorizationToken = authorizationToken;
        }
        return config;
    },
    err => {
        console.log('请求错误', err)   //  如果出错的话 打印出来错误看看
    }
);
//响应拦截
instance.interceptors.response.use(function (res) {
    const code = res.data.code;
    if (code === 401) {
        router.replace({
            name: "login",
            query: {
                redirect: router.currentRoute.fullPath //转发给登录页面当前的path
            }
        })
    }
    if (code !== 200) {
        Vue.prototype.$message({
            message: res.data.msg,
            type: 'error'
        });
    }
    return res
}, function (err) {
    console.log('请求返回发生错误', err)
    Vue.prototype.$message({
        message: err.response.data.msg,
        type: 'error'
    });
})


//...todo 配置请求添加token 返回解析code
export default instance;
