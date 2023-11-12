export default {
    state: {
        currentUser: {
            username: "",
            authorizationToken: "",
            email: "",
            status: "",
            phone: ""
        }

    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser;
        }
    },
    mutations: {
        loginUserInfo(state, params) {
            console.log('state', state, 'params', params);
            state.currentUser.username = params.username;
            state.currentUser.authorizationToken = params.authorizationToken;
            state.currentUser.email = params.email;
            state.currentUser.status = params.status;
            state.currentUser.phone = params.phone;
        }
    },
    actions: {
    }
}