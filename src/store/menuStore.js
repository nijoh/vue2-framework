export default {
    state: {
        menuInfo: []

    },
    getters: {
        getMenuInfo(state) {
            return state.menuInfo;
        }
    },
    mutations: {
        saveMenu(state, params) {
            state.menuInfo = params;
        }
    },
    actions: {
    }
}