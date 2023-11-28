export default {
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
        }
    },
    actions: {
    }
}