import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import patientRoutes from './module/patient'
import doctorRoutes from './module/doctor'
import administratorRoutes from './module/administrator'



const commonRoutes = [
  {path: '/'},
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    redirect: '/login/login',
    children: [
      {
          path: 'login',
          component: () => import('@/views/login/login/index')
      },
      {
          path: 'regist',
          component: () => import('@/views/login/regist/index')
      }
  ]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }]

let otherRoutes = patientRoutes.concat(doctorRoutes, administratorRoutes)
const createRouter = (otherRoutes) => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: commonRoutes.concat(otherRoutes)   
})

let router = createRouter(otherRoutes)

export function resetRouter(role) {
  let newRouter;
  let newRoute;
    switch (role) {
    case "0":
      newRouter = createRouter(patientRoutes)
      newRoute = patientRoutes
      break;
    case "1":
      newRouter = createRouter(doctorRoutes)
      newRoute = doctorRoutes
      break;
    case "2":
      newRouter = createRouter(administratorRoutes)
      newRoute = administratorRoutes
      break;
    default:
      break;
  }
  // console.log(router)
  router.matcher = newRouter.matcher 
  return newRoute
}

export default router
