import Layout from '@/layout/administrator'
const administratorRoutes = [
    {
        path: '/administrator',
        component: Layout,
        redirect: '/administrator/businessData',
        name: 'Example',
        meta: { title: '运营数据', icon: 'example' },
        children: [
            {
                path: 'businessData',
                name: 'businessData',
                component: () => import('@/views/administrator/operationManagement/businessData/index'),
                meta: { title: '营业额数据', icon: 'table' }
            },
            {
                path: 'doctorPerformance',
                name: 'doctorPerformance',
                component: () => import('@/views/administrator/operationManagement/doctorPerformance/index'),
                meta: { title: '医生业绩', icon: 'tree' }
            },
            {
                path: 'patientSituation',
                name: 'patientSituation',
                component: () => import('@/views/administrator/operationManagement/patientSituation/index'),
                meta: { title: "患者情况", icon: 'tree' }
            }
        ]
    },
   
]

export default administratorRoutes