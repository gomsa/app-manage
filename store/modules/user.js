import { mpLogin, login, logout, getInfo } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  mobile: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  mpLogin({ commit }, provider) {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: provider,
        success: function (req) {
          mpLogin({
            code: req.code,
            type: provider
          }).then(response => {
            var data = response.data
            if (data.token != "") {
              commit('SET_TOKEN', data.token)
              setToken(data.token)
            }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        }
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const data = response.data
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response.data
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar, mobile } = data.user
        let roles = ['user']
        if ('roles' in data) {
          roles = data.roles
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_MOBILE', mobile)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')


      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
