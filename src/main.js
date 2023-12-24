import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'normalize.css'
import '@/assets/css/base.css'
import router from './router'
import api from './api'
import Moment from 'moment'
import store from './store/Index'

// import { Message } from 'element-ui'


// // 挂载到$message上
// Vue.prototype.$message = Message
//日期格式化
Vue.prototype.$moment = Moment
//全局日期格式化
Vue.filter("fmtDataTime", (dataTime) => {
  if (dataTime) {
    return Moment(dataTime).format("YYYY-MM-DD HH:mm:ss");
  }
})
Vue.prototype.$api = api;
Vue.prototype.$store = store;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
