import authLogin from './authLogin';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        authLogin
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage, //可以设置window.sessionStorage
            key: 'currentUser', // 存数据的key名 
            paths: ['authLogin'] // 要把那些模块加入缓存
        })
    ]

});
