const state = {
    oauthProvider: '',
}

const mutations = {
    SET_OAUTH_PROVIDER: (state) => {
        uni.getProvider({
            service: 'oauth',
            success: (result) => {
                state.oauthProvider = result.provider[0]
            }
        })
    }
}

const actions = {
    setOauthProvider({ commit }) {
        commit('SET_OAUTH_PROVIDER')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
