const systemBaseUrl = '/jeecg-system'
const modelBaseUrl = '/sleep-modules'

export default {
    // apiurl
    apiurl: import.meta.env.VITE_BASE_API,

    // 登录
    login: systemBaseUrl + '/sys/login',
    randomImage: systemBaseUrl + '/sys/randomImage',
    // 获取用户信息
    getInfo: systemBaseUrl + '/sys/permission/getUserPermissionByToken',
    // 获取菜单
    getRouters: '/getRouters',
    // 上传图片
    upload: systemBaseUrl + '/sys/common/upload',
    insertFile: systemBaseUrl + '/sys/common/insertFile',
    // 查询词典
    queryAllDictItems: systemBaseUrl + '/sys/dict/queryAllDictItems',
    // 系统管理
    system: {
        sysAnnouncement: systemBaseUrl + '/sys/sysAnnouncementSend/getMyAnnouncementSend',
        editSend: systemBaseUrl + '/sys/sysAnnouncementSend/editSend',
        // 菜单管理
        menu: systemBaseUrl + '/sys/permission',
        // 角色管理
        role: systemBaseUrl + '/sys/role',
        // 获取树状菜单
        queryTreeList: systemBaseUrl + '/sys/role/queryTreeList',
        // 查询角色已选菜单
        queryRolePermission: systemBaseUrl + '/sys/permission/queryRolePermission',
        // 添加菜单权限
        saveRolePermission: systemBaseUrl + '/sys/permission/saveRolePermission',

        // 部门管理
        depart: systemBaseUrl + '/sys/sysDepart',

        // 用户管理
        user: systemBaseUrl + '/sys/user',

        // 职务管理
        position: systemBaseUrl + '/sys/position',

        // 词典管理
        dict: systemBaseUrl + '/sys/dict',
        dictItem: systemBaseUrl + '/sys/dictItem',

        // 日志管理
        log: systemBaseUrl + '/sys/log/list',

        // 定时任务
        quartzJob: systemBaseUrl + '/sys/quartzJob'
    },
    // 公共接口
    commom: {
        logic: modelBaseUrl + '/utils/queryCalculationEnumBy', // 查询逻辑运算符号类型
        metadata: modelBaseUrl + '/utils/queryCalculationEnumBy12', // 模拟元数据返回字段
        enumBy: modelBaseUrl + '/utils/queryCalculationEnumBy', // 模拟元数据返回字段
        adressDic: modelBaseUrl + '/patientRecord/patientRecord/queryAdressDictList', // 区域代码
        adressDicByLevel: modelBaseUrl + '/patientRecord/patientRecord/queryAddressDictListByLevel', // 省市区根据父级查询子级区域 省父级为0
        country: modelBaseUrl + '/nationality/nationality/queryByAll', // 国籍-查询全部国籍
        nation: modelBaseUrl + '/nationality/nation/queryAll' // 民族-查询全部 中国154
    }
}
