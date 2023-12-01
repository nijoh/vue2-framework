export default {
    namespaced: true,
    state: {
        currentUser: null
    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser;
        }
    },
    mutations: {
        loginUserInfo(state, params) {
            console.log('state', state, 'params', params);
            state.currentUser = params;
            localStorage.setItem('currentUser', JSON.stringify(params));
        }
    },
    actions: {
        setLoginStore(context, params) {
            console.log('params', params);
            context.commit('loginUserInfo', params);
        }
    }
}