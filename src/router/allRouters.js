const system = () => import("@/views/layout/system/Index.vue");//系统管理
const users = () => import("@/views/layout/system/users/Index.vue");//用户管理
const addUser = () => import("@/views/layout/system/users/addUser.vue");//添加用户
const allRouters = [{
    //系统管理
    path: '/system',
    name: 'System',
    component: system,
    children: [{
        //用户管理
        path: 'users',
        name: 'Users',
        meta: {
            title: '用户管理'
        },
        component: () => import("@/views/layout/system/users/usersLayout.vue"),
        children: [{
            path: '', // 默认子路由
            name: 'Users',
            component: users
        },
        {
            //新增用户
            path: 'addUser',
            name: 'AddUser',
            component: addUser,
            meta: {
                activePath: '/system/users'
            }
        }]

    }]

}]
export default allRouters;
