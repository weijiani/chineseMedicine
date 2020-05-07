import Layout from '@/layout/patient'
const patientRoutes = [
    {
        path: '/patient',
        component: Layout,
        redirect: '/patient/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/patient/home/index')
        }]
    },
    {
        path: '/registration',
        component: Layout,
        redirect: '/registration/selectDep',
        children: [{
            path: 'selectDep',
            name: 'selectDep',
            component: () => import('@/views/patient/registration/selectDep')
        },
        {
            path: 'selectDoc',
            name: 'selectDoc',
            component: () => import('@/views/patient/registration/selectDoc')
        },
        {
            path: 'selectTime',
            name: 'selectTime',
            component: () => import('@/views/patient/registration/selectTime')
        }]
    },
    {
        path: '/payRecord',
        component: Layout,
        redirect: '/payRecord/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/patient/payRecord/index')
        }]
    },
    {
        path: '/appointRecord',
        component: Layout,
        redirect: '/appointRecord/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/patient/appointRecord/index')
        }]
    },
    {
        path: '/medicinePay',
        component: Layout,
        redirect: '/medicinePay/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/patient/medicinePay/index')
        }]
    },
    {
        path: '/patientDetail',
        component: Layout,
        redirect: '/patientDetail/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/patient/patientDetail/index')
        }]
    },

]

export default patientRoutes