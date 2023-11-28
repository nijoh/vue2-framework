import authLogin from './authLogin';
import menuStore from './menuStore';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
export default new Vuex.Store({
    state: {},
    modules: {
        authLogin,
        menuStore
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage, //可以设置window.sessionStorage
            key: ['currentUser'], // 存数据的key名 
            path: ['authLogin'],
            reducer(val) {
                return val.authLogin.currentUser;
            }
        }),
        createPersistedState({
            storage: window.localStorage,
            key: ['dynamicMenus'],
            path: ['menuStore'],
            reducer(val) {
                return val.menuStore.dynamicMenus;
            }
        })
    ]

});
