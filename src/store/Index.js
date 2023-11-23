import authLogin from './authLogin';
import menuStore from './menuStore';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        authLogin,
        menuStore
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage, //可以设置window.sessionStorage
            key: 'currentUser', // 存数据的key名 
            paths: ['authLogin', 'menuStore'] // 要把那些模块加入缓存
        })
    ]

});
