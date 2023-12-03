/** 完整前端静态路由 */
import Home from "@/views/home/Home.vue";
import Layout from "@/views/layout/Index.vue";

// export const routesSSS =
// {
//     path: '/',
//     component: Layout,
//     children: [{
//         path: '/',
//         component: Home,
//         name: 'Home',
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
//             component: () => import("@/views/layout/system/users/usersLayout.vue"),
//             children: [{
//                 path: '', // 默认子路由
//                 name: 'users',
//                 component: () => import("@/views/layout/system/users/Index.vue")
//             },
//             {
//                 //新增用户
//                 path: 'addUser',
//                 name: 'AddUser',
//                 component: () => import("@/views/layout/system/users/addUser.vue"),
//                 meta: {
//                     activePath: '/system/users'
//                 }
//             }]
//         },
//         ]
//     }
//     ]
// }

/**基础路由信息 */
const baseRouters = {
    path: '/',
    component: Layout,
    children: [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            isLogin: true,
            title: '首页'
        }
    }]
};
export default baseRouters;
