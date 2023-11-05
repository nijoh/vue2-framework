// 引入axios
import axios from 'axios';
import Vue from 'vue';
const instance = axios.create({
    timeout: 10000 // 超时时间
})

//请求拦截
instance.interceptors.request.use(
    config => {
        //   const token = sessionStorage.getItem("token"); //获取存储在本地的token，如果需要token就在这里带上
        //   config.data = JSON.stringify(config.data);  // 这里我们也可以在过滤下 请求参数数据
        config.headers = {    // 设置请求头   常用语post请求 
            "Content-Type": "application/json"
        };
        //    if (token) {
        //         config.headers.Authorization = "Token " + token; //存在的话 就携带 token
        //   }
        return config;   //  然后把配置返回
    },
    err => {
        console.log(err)   //  如果出错的话 打印出来错误看看
    }
);
//响应拦截
instance.interceptors.response.use(function (res) {
    const code = res.data.code;
    console.log(code);
    if (code !== 200) {
        Vue.prototype.$message({
            message: res.data.msg,
            type: 'error'
        });
    }
    return res
}, function (err) {
    this.$message.error('错了哦，这是一条错误消息');
    console.log(err.response);
})


//...todo 配置请求添加token 返回解析code
export default instance;
