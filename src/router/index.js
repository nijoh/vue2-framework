import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Index.vue";
import Layout from "@/views/layout/Index.vue";
import Home from "@/views/home/Home.vue";

// 异步加载
const system = () => import("@/views/layout/system/Index.vue");//系统管理
const users = () => import("@/views/layout/system/users/Index.vue");//用户管理
const addUser = () => import("@/views/layout/system/users/addUser.vue");//添加用户

Vue.use(VueRouter);

const routes = [{
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    component: Home
  }, {
    //系统管理
    path: '/system',
    component: system,
    children: [{
      //用户管理
      path: 'users',
      component: users,
    }, {
      //新增用户
      path: 'addUser',
      component: addUser
    }
    ]
  }
  ]
}, {
  path: '/login',
  name: 'login',
  component: Login
}
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router;