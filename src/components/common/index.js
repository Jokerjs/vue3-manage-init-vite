import CScrollbar from '../CScrollbar'
const common = import.meta.globEager('./**/*.vue')

export default {
    install: function(Vue) {
        Object.keys(common).forEach((key) => {
            const name = key.replace(/(\.\/|\.vue)/g, '')
            Vue.component(name, common[key].default)
        })
        Vue.component('c-scrollbar', CScrollbar)
    }
}
