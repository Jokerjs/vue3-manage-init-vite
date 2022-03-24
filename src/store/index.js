/**
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */

import { createStore } from 'vuex'
import user from './modules/user';
import view from './modules/view';
user.namespaced = true
view.namespaced = true
export default createStore({
    modules: {
        user,
        view
    }
})
