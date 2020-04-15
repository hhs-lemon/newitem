const state = {
  menusList: []
}

const mutations = {
  SET_MENUS: (state, menusList) => {
    console.log(menusList, 'menusssssss')
    state.menusList = menusList
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
