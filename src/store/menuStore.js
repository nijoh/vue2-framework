import api from '@/api';
import "core-js/stable/promise";
import compareMenu from "@/utils/compare";

export default {
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
        },

    },
    actions: {
        //加载后端动态路由
        loadDynamicMenus(context, baseRouters) {
            console.log("actions#loadDynamicMenus,参数", baseRouters);
            return new Promise((resolve) => {
                api.queryAllMenu().then(res => {
                    //比较并合并路由
                    compareMenu(baseRouters, res.data.content);
                    context.commit('setMenus', res.data.content);

                    resolve(baseRouters);
                });
            });
        }
    }
}