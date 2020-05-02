import _has from 'lodash/has'

const menuItems = {
    home: {to: '', label: 'Home', icon: 'mdi-home'},
    user: {to: 'user', label: 'Users', icon: 'account_circle'},
    brand: {to: 'brand', label: 'Brands', icon: 'mdi-ballot'},
    report: {to: 'report', label: 'Submission', icon: 'mdi-clipboard-arrow-up-outline'},
    profile: {to: 'profile', label: 'Profile', icon: 'account_circle'},
    profilereport: {to: 'profilereport', label: 'Submission', icon: 'mdi-clipboard-arrow-up-outline'}
}


const menus = {
  admin: [
    menuItems.home,
    menuItems.brand,
    menuItems.report,
    menuItems.user
  ],
  'user': [
    menuItems.home,
    menuItems.profilereport,
    menuItems.profile
  ],
  guest: [

  ]
}

export const state = () => ({
  locale: 'it',
  title: 'Take Down',
  debugMode: true,
  ui: {currentMenuItem: 0, currentTab: 0},
  languages: [
    {id: 'it', label: 'ITA'},
    {id: 'en', label: 'ENG'},
    {id: 'de', label: 'DEU'}
  ],
  menus
})

export const mutations = {
  setLocale (state, payload) {
    state.locale = payload
  },
  setTitle (state, payload) {
    state.title = payload
  },
  setLanguages (state, payload) {
    state.languages = payload
  },
  setMenu (state, payload) {
    state.menu = payload
  }
}

export const actions = {
  logOut ({commit}, $auth) {
    $auth.setUser({})
  }
}

export const getters = {
  role: (s, g, rs) => !_has(rs, 'auth.user.role') ? 0 : rs.auth.user.role,
  user: (s, g, rs) => !_has(rs, 'auth.user') ? '' : rs.auth.user,
  userName: (s, g, rs) => !_has(rs, 'auth.user.name') ? '' : `${rs.auth.user.name} ${rs.auth.user.surname}`,
  menuItems: (s, g) => {
    let rName = 'user'
    if(g.role === 0) rName = 'admin'
    return s.menus[rName]
  },
  isAdmin: (s,g) => g.role === 0
}
