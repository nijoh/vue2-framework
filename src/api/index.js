import axios from "@/utils/request";
import baseUrl from "./base";
const api = {
    //用户管理分页查询
    accountUserQueryPage(params) {
        return axios.post(baseUrl.accountUserQueryPage, params);
    },
    //新增用户
    accountUserAddUser(params) {
        return axios.post(baseUrl.accountUserAddUser, params);
    },
    //登录用户
    authLogin(params) {
        return axios.post(baseUrl.authLogin, params);
    },
    //删除用户
    deleteUser(params) {
        return axios.post(baseUrl.deleteUser, params);
    },
    //查询所有菜单
    queryAllMenu() {
        return axios.get(baseUrl.queryAllMenu);
    },
    //查询所有菜单Tree结构
    queryTree() {
        return axios.get(baseUrl.queryTree);
    },
    //用户详细信息
    queryDetail(val) {
        return axios.get(baseUrl.queryDetail, {
            params: {
                ...val
            }
        });
    },
    //修改员工信息
    modifyStaff(params) {
        return axios.post(baseUrl.modifyStaff, params);
    },
    //查询所有角色
    queryRoles() {
        return axios.post(baseUrl.queryRoles);
    },
    //授权角色
    authorizeRole(params) {
        return axios.post(baseUrl.authorizeRole, params);
    },
    //冻结用户
    freezeStaff(params) {
        return axios.post(baseUrl.freezeStaff, params);
    },
    //修改菜单
    modifyMenu(params) {
        return axios.post(baseUrl.modifyMenu, params);
    },
    //新增菜单
    addMenu(params) {
        return axios.post(baseUrl.addMenu, params);
    },
    //删除菜单
    deleteMenu(params) {
        return axios.post(baseUrl.deleteMenu, params);
    }
}
export default api;

