import Layout from '@/layout/administrator'
const administratorRoutes = [
    {
        path: '/administrator',
        component: Layout,
        redirect: '/administrator/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/administrator/dashboard/index'),
            meta: { title: '管理者', icon: 'dashboard' }
        }]
    }
    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/table',
    //     name: 'Example',
    //     meta: { title: 'Example', icon: 'example' },
    //     children: [
    //         {
    //             path: 'table',
    //             name: 'Table',
    //             component: () => import('@/views/administrator/table/index'),
    //             meta: { title: 'Table', icon: 'table' }
    //         },
    //         {
    //             path: 'tree',
    //             name: 'Tree',
    //             component: () => import('@/views/administrator/tree/index'),
    //             meta: { title: 'Tree', icon: 'tree' }
    //         }
    //     ]
    // }
]

export default administratorRoutes