export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue')
    },
    {
        path: '/',
        redirect: '/Manage'
    },
    // {
    //     path: '/Manage',
    //     component: () => import('@/views/Layouts/index.vue'),
    //     children: [
    //         {
    //             path: 'DualReferral',
    //             component: () => import('@/views/Layouts/LayoutsView.vue'),
    //             children: [
    //                 {
    //                     path: 'ChangeInto',
    //                     component: () => import('@/views/Manage/DualReferral/ChangeInto/index.vue')
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        path: '/noPage',
        name: 'noPage',
        component: () => import('@/views/Layouts/index.vue'),
        children: [
            {
                path: '404',
                name: '404',
                component: () => import('@/views/error/404.vue')
            }
        ]
    }
]
