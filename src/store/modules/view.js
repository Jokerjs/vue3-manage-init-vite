const view = {
    state: {
        breadcrumb: {},
        breadcrumbs: [],
        cachedViews: [], // 缓存name
        vMenu: {
            activeName: [],
            openNames: [],
            list: [],
            opened: []
        },
        isCollapse: false,
        isFullScren: false,
        color: {
            primaryColor: '#1890ff',
            headerMenuColor: '#000c17',
            menuActiveColor: '',
            menuTextColor: '#fff',
            headerColor: '#fff',
            menuColor: '#000c17'
        }
    },
    getters: {
        primaryColor: (state) => state.color.primaryColor,
        headerMenuColor: (state) => state.color.headerMenuColor,
        menuActiveColor: (state) => state.color.menuActiveColor,
        menuTextColor: (state) => state.color.menuTextColor,
        headerColor: (state) => state.color.headerColor,
        menuColor: (state) => state.color.menuColor,
        isCollapse: (state) => state.isCollapse,
        vMenu: (state) => state.vMenu,
        breadcrumb: (state) => state.breadcrumb,
        breadcrumbs: (state) => state.breadcrumbs,
        cachedViews: (state) => state.cachedViews
    },
    mutations: {
        SET_BREADCRUMB_DATA(state, to) {
            const openNames = []
            const vMenus = to.fullPath.split('/')
            vMenus.forEach((item, index) => {
                openNames.push(vMenus.slice(index, vMenus.length - 1).join('/'))
            })
            const breadcrumb = {path: to.path, name: to.name, ...to.meta}
            if(!state.breadcrumbs.some(item => item.path === breadcrumb.path)) {
                state.breadcrumbs.push(breadcrumb)
                state.cachedViews.push(to.name)
            }
            Object.assign(state, {
                breadcrumb: breadcrumb,
                // breadcrumbs: to.matched.slice(1),
                vMenu: {
                    openNames: openNames,
                    activeName: [to.fullPath]
                }
            })
        },
        CLOSE_CRUMB_DATA(state, to) {
            state.breadcrumbs = state.breadcrumbs.filter(item => item.path !== to.path)
            state.cachedViews = state.cachedViews.filter(name => name !== to.name)
        },
        TOGGLE_COLLAPSE(state, isCollapse) {
            state.isCollapse = isCollapse || !state.isCollapse
        }
    },
    actions: {}

}
export default view
