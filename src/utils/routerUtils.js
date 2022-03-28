const modules = import.meta.glob('../views/**/*.vue')

export default {
    getComponent(path) {
        return modules[`../views${path}/index.vue`] || modules['../views/error/404.vue']
    },
    genChildrenRoute(routers, path = '') {
        return routers.map(item => {
            const childrenPath = `${path}/${item.name}`
            const component = item.children && item.children.length ? modules['../views/Layouts/LayoutsView.vue'] : this.getComponent(childrenPath)
            const route = {
                name: item.name,
                path: item.name,
                component: component
            }
            if (item.children && item.children.length) {
                route.redirect = `${childrenPath}/${item.children[0].name}`
                route.children = this.genChildrenRoute(item.children, childrenPath)
            }
            return route
        })
    },
    createRouters(menu, path = '/Manage') {
        return {
            path,
            meta: {title: '系统后台'},
            component: modules['../views/Layouts/index.vue'],
            children: this.genChildrenRoute(menu, path),
            redirect: `${path}/${menu[0].name}`
        }
    }
}
