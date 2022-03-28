/**
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */

import {createStore} from 'vuex'

const modulesPages = import.meta.globEager('./modules/*.js')

const modules = {}
Object.keys(modulesPages).forEach((key) => {
    const name = key.replace(/(\.\/modules\/|\.js)/g, '')
    modules[name] = modulesPages[key].default
    modules[name].namespaced = true
})

export default createStore({
    modules
})
