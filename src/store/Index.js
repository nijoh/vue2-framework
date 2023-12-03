import authLogin from './authLogin';
import menuStore from './menuStore';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        authLogin,
        menuStore
    }
});
