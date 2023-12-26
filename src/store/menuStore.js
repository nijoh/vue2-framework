import api from '@/api';
import "core-js/stable/promise";
import compareMenu from "@/utils/compare";
import { getLocalStore } from "@/utils/common"

export default {
    namespaced: true,
    state: {
        dynamicMenus: getLocalStore("dynamicMenus")
    },
    getters: {
        getMenus(state) {
            return state.dynamicMenus;
        }
    },
    mutations: {
        setMenus(state, dyMenu) {
            state.dynamicMenus = dyMenu;
            localStorage.setItem('dynamicMenus', JSON.stringify(dyMenu));
        },

    },
    actions: {
        //加载后端动态路由
        loadDynamicMenus(context) {
            return new Promise((resolve) => {
                api.queryTree().then(res => {
                    //比较并合并路由
                    const baseRouters = compareMenu(res.content);
                    context.commit('setMenus', res.content);
                    resolve(baseRouters);
                });
            });
        }
    }
}