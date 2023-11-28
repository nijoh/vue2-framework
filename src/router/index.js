import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Index.vue";
import store from '@/store/Index'
import Layout from "@/views/layout/Index.vue";
import Home from "@/views/home/Home.vue";
import getLocalStoreByVal, { getLocalStore } from "@/utils/common";
import compareMenu from "@/utils/compare";
Vue.use(VueRouter);

export const baseRouters = {
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isLogin: true
    }
  }]
};

const routesSSS =
{
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    component: Home,
    meta: {
      isLogin: true
    }
  }, {
    //系统管理
    path: '/system',
    name: 'system',
    component: () => import("@/views/layout/system/Index.vue"),
    children: [{
      //用户管理
      path: 'users',
      name: 'users',
      component: () => import("@/views/layout/system/users/Index.vue"),
    }, {
      //新增用户
      path: 'addUser',
      name: 'addUser',
      component: () => import("@/views/layout/system/users/addUser.vue"),
      meta: {
        activePath: '/system/users'
      }
    }
    ]
  }
  ]
}

const routes = [
  {
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
//守卫
const whiteList = ['/login']
//加载本地动态路由标志（页面刷新使用）
let reloadLocalStroeMenusTag = true;
router.beforeEach((to, from, next) => {
  console.log("记录beforeEach次数");
  //白名单
  if (whiteList.includes(to.path)) {
    return next();
  }
  //获取本次存储菜单
  const localStoreDyMeus = getLocalStore("dynamicMenus");
  //是否已登录
  const authorizationToken = getLocalStoreByVal("currentUser", "authorizationToken");
  if (!authorizationToken) {
    return next({
      path: "/login", query: {
        redirect: to.fullPath //转发给登录页面当前的path
      }
    }
    )
  }

  //异步加载菜单
  if (!localStoreDyMeus) {
    store.dispatch('loadDynamicMenus', baseRouters).then(baseRouters => {
      console.log("routIndex返回合并菜单", baseRouters);

      let tmp = [baseRouters];
      router.addRoutes(tmp);
      console.log("tototo----------", to);
      reloadLocalStroeMenusTag = false;
      router.push({ ...to, replace: true })
    });
  } else {
    if (reloadLocalStroeMenusTag) {

      compareMenu(baseRouters, localStoreDyMeus);
      let tmp = [baseRouters];
      router.addRoutes(tmp);
      reloadLocalStroeMenusTag = false;
      return router.push({ ...to, replace: true })
    }
    next();

  }
  console.log("beforeEach执行完成");
})



export default router;