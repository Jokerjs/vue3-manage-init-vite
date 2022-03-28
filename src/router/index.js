import {createRouter, createWebHistory} from 'vue-router'
import routes from './pages.js'
import store from '@/store/index.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    base: import.meta.env.VITE_PUBLICPATH,
    routes
})

const whiteList = ['/login', '/TreatmentTable', '/index']

router.beforeEach(async (to, from, next) => {
    const user = store.state.user
    if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        return next()
    } else {
        if (!user.accessToken) {
            store.commit('user/USER_INFO_LOGINOUT')
            next('/login')
        } else {
            // 有token
            if (to.path === '/login') {
                next({path: '/'})
            } else {
                if (!user.login) {
                    await store.dispatch('user/GetUserInfo')
                    await store.dispatch('dics/GetDictItems')
                    router.addRoute(user.routers)
                    next({...to, replace: true}) // hack方法 确保addRoutes已完成
                } else {
                    next()
                }
            }
        }
    }
})

router.afterEach((to) => {
    if (to.matched.length > 0) {
        if (to.path !== '/login') store.commit('view/SET_BREADCRUMB_DATA', to)
    } else {
        // router.push({ path: '/noPage/404' })
    }
    // store.commit('ivew/SET_RUNTIME_CLEAR')
})

export default router
