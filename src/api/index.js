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
    }
}
export default api;

