const state = {
  info: {},
  loginInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LoginInfo: (state, data) => {
    state.loginInfo = data
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
