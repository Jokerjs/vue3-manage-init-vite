import { _http, _api } from '@/libs/'
import routerUtils from '@/utils/routerUtils'

const user = {
    state: {
        login: false,
        accessToken: localStorage.getItem('accessToken'),
        user: JSON.parse(localStorage.getItem('userInfo')) || {},
        menus: [],
        buttons: [],
        routers: []
    },
    getters: {
        accessToken: (state) => state.accessToken,
        username: (state) => state.user.username,
        avatar: (state) => state.user.avatar,
        permissions: (state) => state.permissions,
        menus: (state) => state.menus
    },
    mutations: {
        // 是否登录
        USER_LOGIN (state, payload) {
            Object.assign(state, { accessToken: payload.token })
            Object.assign(state, { user: payload.userInfo })
            localStorage.setItem('accessToken', payload.token)
            localStorage.setItem('userInfo', JSON.stringify(payload.userInfo))
        },
        USER_INFO_DATA (state, payload) {
            const menus = payload.menu.find(item => item.path === '/Sleep').children
            const routers = routerUtils.createRouters(menus)
            Object.assign(state, {
                routers: routers,
                buttons: payload.auth,
                menus: menus
            })
            Object.assign(state, { login: true })
        },
        USER_INFO_LOGINOUT (state) {
            Object.assign(state, {
                user: {},
                login: false,
                accessToken: '',
                menus: [],
                routers: {}
            })
            state.routers = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userInfo')
        }
    },
    actions: {
        // 根据用户名登录
        LoginByUsername ({ commit }, params) {
            return _http.post(_api.login, params).then(res => commit('USER_LOGIN', res))
        },
        GetUserInfo ({ commit }, params) {
            return _http.get(_api.getInfo, params).then(res => commit('USER_INFO_DATA', res || {}))
        }
    }
}
export default user
