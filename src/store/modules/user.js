import { regist, login, logout, getInfo } from '@/api/user'
import { 
  getToken, 
  setToken, 
  removeToken, 
  getRole, 
  setRole, 
  removeRole,
  getAvatar,
  setAvatar,
  removeAvatar,
  getUserName,
  setUserName,
  removeUserName
 } from '@/utils/auth'
import { resetRouter } from '@/router'


const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: '',
    username: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
   // user login
   regist({ commit }, userInfo) {
    const { username, password, role } = userInfo
    return new Promise((resolve, reject) => {
      regist({ username: username.trim(), password: password, role: role }).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password, role } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, role: role }).then(response => {
        const { data } = response
        if(data.resCode === 1) {
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.role)
          commit('SET_AVATAR', data.avatar)
          commit('SET_ROLE', data.role)
          commit('SET_USERNAME', data.username)
          setToken(data.token)
          setRole(data.role)
          setAvatar(data.avatar)
          setUserName(data.username)
        }
        resolve(data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    commit('RESET_STATE')
    removeToken()
    removeRole()
    removeAvatar()
    removeUserName()
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeRole()
      removeAvatar()
      removeUserName()
      commit('RESET_STATE')
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

