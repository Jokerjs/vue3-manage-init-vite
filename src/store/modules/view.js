const view = {
    state: {
        breadcrumb: [],
        vMenu: {
            activeName: [],
            openNames: [],
            list: [],
            opened: []
        },
        isCollapse: false,
        isFullScren: false,
        color: {
            headerMenuColor: '#000c17',
            menuActiveColor: '',
            menuTextColor: '#fff',
            headerColor: '#fff',
            menuColor: '#000c17'
        }
    },
    getters: {
        headerMenuColor: (state) => state.color.headerMenuColor,
        menuActiveColor: (state) => state.color.menuActiveColor,
        menuTextColor: (state) => state.color.menuTextColor,
        headerColor: (state) => state.color.headerColor,
        menuColor: (state) => state.color.menuColor,
        isCollapse: (state) => state.isCollapse,
        vMenu: (state) => state.vMenu
    },
    mutations: {
        SET_BREADCRUMB_DATA(state, to) {
            const openNames = []
            const vMenus = to.fullPath.split('/')
            vMenus.forEach((item, index) => {
                openNames.push(vMenus.slice(index, vMenus.length - 1).join('/'))
            })
            state.breadcrumb = to.matched.slice(1)
            state.vMenu = {
                openNames: openNames,
                activeName: [to.fullPath]
                // opened: vMenus.slice(-1).includes('Sleep') ? [] : [vMenus.slice(2, -1).pop()],
                // list: store.state.user.menus.find(item => item.path === vMenus[2])
            }
        },
        TOGGLE_COLLAPSE(state, isCollapse) {
            state.isCollapse = isCollapse || !state.isCollapse
        }
    },
    actions: {}

}
export default view
