export const state = () => ({
  user: 'admin',
  role: 'admin',
  signingIn: false,
  loggedIn: false,
  profile: {},
  counter: 0
})

export const mutations = {
  setSigningIn (s, p) { s.signingIn = p },
  setRofile (s, p) { s.profile = p },
  setLoggedIn (s, p) { s.loggedIn = p },
  setUser (s, p) { s.user = p },
  setCounter (s) { s.counter++ },
  setRole (s, p) { s.role = p }
}

export const actions = {
  logout ({commit, state, dispatch}) {
    commit('setSigningIn', false)
    return dispatch('api/get', {url: '/logout'}, {root: true})
      .then(res => {
        commit('setUser', null)
        commit('setLoggedIn', false)
        window.location = '/monitor/res'
      })
  }
}

export const getters = {
}
