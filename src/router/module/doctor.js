import Layout from '@/layout/doctor'
const doctorRoutes = [
    // {
    //     path: '/doctor',
    //     component: Layout,
    //     redirect: '/doctor/dashboard',
    //     children: [{
    //         path: 'dashboard',
    //         name: 'Dashboard',
    //         component: () => import('@/views/doctor/dashboard/index'),
    //         meta: { title: '病人管理', icon: 'dashboard' }
    //     }]
    // },

    {
        path: '/doctor',
        component: Layout,
        redirect: '/doctor/appointmentList',
        name: 'Example',
        meta: { title: '病人管理', icon: 'example' },
        children: [
            {
                path: 'appointmentList',
                name: 'appointmentList',
                component: () => import('@/views/doctor/patientManagement/appointmentList/index'),
                meta: { title: '预约列表', icon: 'table' }
            },
            {
                path: 'prescribing',
                name: 'prescribing',
                component: () => import('@/views/doctor/patientManagement/prescribing/index'),
                meta: { title: '开处方', icon: 'tree' }
            }
        ]
    },
    {
        path: '/drug',
        component: Layout,
        redirect: '/drug/drugList',
        name: 'Example',
        meta: { title: '药方管理', icon: 'example' },
        children: [
            {
                path: 'addDurg',
                name: 'addDurg',
                component: () => import('@/views/doctor/drugManagement/addDrug/index'),
                meta: { title: '添加药方', icon: 'table' }
            },
            {
                path: 'durgList',
                name: 'durgList',
                component: () => import('@/views/doctor/drugManagement/drugList/index'),
                meta: { title: '药方列表', icon: 'tree' }
            }
        ]
    },
    {
        path: '/medicalRecord',
        component: Layout,
        redirect: '/medicalRecord/medicalRecordCheck',
        name: 'Example',
        children: [
            {
                path: 'medicalRecordCheck',
                name: 'medicalRecordCheck',
                component: () => import('@/views/doctor/medicalRecord/index'),
                meta: { title: '病历查询', icon: 'table' }
            }
        ]
    }
]

export default doctorRoutes