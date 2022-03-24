import axios from 'axios'
import _api from './_api'
import { notification, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const _http = axios.create({
    baseURL: _api.apiurl,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// HTTPrequest拦截
_http.interceptors.request.use(config => {
    const method = config.method
    NProgress.start()
    // 设置token
    const authorization = store.state.user.accessToken
    if (authorization) {
        config.headers['X-Access-Token'] = authorization
    }
    if (method === 'get') {
        config.params = Object.assign({}, config.params, {
            column: 'createTime',
            order: 'desc'
        })
    }
    return config
}, error => {
    return Promise.reject(error)
})

const toLogin = () => {
    store.commit('USER_INFO_LOGINOUT')
    // const pathname = window.location.pathname.substr(1);
    // window.location.href = `/login?${pathname}`;
    window.location.href = import.meta.env.VITE_PUBLICPATH + 'login'
}
const goLogin = () => {
    Modal.confirm({
        title: '重新登录？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '登录过期，请重新登录！',
        onOk(){
            toLogin()
        },
        onCancel() {
            toLogin()
        },
    })
}

const errMsg = (error) => {
    const data = error.response.data
    const token = store.state.user.accessToken
    NProgress.done()
    switch (error.response.status) {
        case 403:
            notification.error({message: '拒绝访问'})
            break
        case 500:
            if (token && data.message && data.message.includes('Token失效')) {
                goLogin()
            }
            break
        case 404:
            notification.error({message: '很抱歉，资源未找到!'})
            break
        case 504:
            notification.error({message: '网络超时!'})
            break
        case 401:
            goLogin()
            break
        default:
            notification.error({message: '网络错误!', description: data.message || '网络错误！'})
    }
    return Promise.reject(data)
}

const messageWhite = [_api.login]

// HTTPresponse拦截
_http.interceptors.response.use(response => {
    NProgress.done()
    const code = response.data.code
    const method = response.config.method
    const url = response.config.url
    if (code !== 0 && code !== 200) {
        notification.error({message: '错误', description: response.data.message})
        return Promise.reject(response.data.message)
    }
    if (method !== 'get' && !messageWhite.includes(url)) notification.success({message: '操作成功！'})
    return response.data.result !== undefined ? response.data.result : response.data
}, errMsg)

export default _http
