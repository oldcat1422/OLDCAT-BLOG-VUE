export default {
  namespaced: true,
  
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null')
  },
  
  getters: {
    // 是否已登录
    isLoggedIn: state => !!state.token,
    // 是否为管理员（role为9的是管理员）
    isAdmin: state => state.userInfo?.role === 9,
    // 获取用户信息
    userInfo: state => state.userInfo,
    // 获取token
    token: state => state.token
  },
  
  mutations: {
    // 设置token
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    // 设置用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    // 清除用户信息（退出登录）
    CLEAR_USER(state) {
      state.token = ''
      state.userInfo = null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  },
  
  actions: {
    // 登录
    login({ commit }, { token, userInfo }) {
      commit('SET_TOKEN', token)
      commit('SET_USER_INFO', userInfo)
    },
    // 退出登录
    logout({ commit }) {
      commit('CLEAR_USER')
    }
  }
}
