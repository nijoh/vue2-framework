import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login/Index.vue";
import store from '@/store/Index'
import getLocalStoreByVal, { getLocalStore } from "@/utils/common";
import compareMenu from "@/utils/compare";
Vue.use(VueRouter);

/**登录路由 */
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
    store.dispatch('menuStore/loadDynamicMenus').then(baseRouters => {
      let tmp = [baseRouters];
      router.addRoutes(tmp);
      console.log("tototo----------", to);
      reloadLocalStroeMenusTag = false;
      router.push({ ...to, replace: true })
    });
  } else {
    if (reloadLocalStroeMenusTag) {
      const baseRouters = compareMenu(localStoreDyMeus);
      let tmp = [baseRouters];
      router.addRoutes(tmp);
      reloadLocalStroeMenusTag = false;
      return router.push({ ...to, replace: true })
    }
    next();

  }

})



export default router;