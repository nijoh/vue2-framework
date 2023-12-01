import api from '@/api';
import "core-js/stable/promise";
import compareMenu from "@/utils/compare";

export default {
    namespaced: true,
    state: {
        dynamicMenus: undefined

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
                api.queryAllMenu().then(res => {
                    //比较并合并路由
                    const baseRouters = compareMenu(res.data.content);
                    context.commit('setMenus', res.data.content);

                    resolve(baseRouters);
                });
            });
        }
    }
}