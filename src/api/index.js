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
    }
}
export default api;

