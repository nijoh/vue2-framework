/** 完整前端静态路由 */
// import Layout from "@/views/layout/Index.vue";
// const routesSSS =
// {
//     path: '/',
//     component: Layout,
//     children: [{
//         path: '/',
//         component: Home,
//         meta: {
//             isLogin: true
//         }
//     }, {
//         //系统管理
//         path: '/system',
//         name: 'system',
//         component: () => import("@/views/layout/system/Index.vue"),
//         children: [{
//             //用户管理
//             path: 'users',
//             name: 'users',
//             component: () => import("@/views/layout/system/users/Index.vue"),
//         }, {
//             //新增用户
//             path: 'addUser',
//             name: 'addUser',
//             component: () => import("@/views/layout/system/users/addUser.vue"),
//             meta: {
//                 activePath: '/system/users'
//             }
//         }
//         ]
//     }
//     ]
// }
import Home from "@/views/home/Home.vue";
import Layout from "@/views/layout/Index.vue";
/**基础路由信息 */
const baseRouters = {
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
export default baseRouters;
