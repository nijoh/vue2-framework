const system = () => import("@/views/layout/system/Index.vue");//系统管理
const users = () => import("@/views/layout/system/users/Index.vue");//用户管理
const addUser = () => import("@/views/layout/system/users/addUser.vue");//添加用户
const usersLayout = () => import("@/views/layout/system/users/usersLayout.vue");
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
        component: usersLayout,
        children: [{
            path: '', // 默认子路由
            name: 'Users',
            component: users,
            meta: {
                skip: true
            }
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
