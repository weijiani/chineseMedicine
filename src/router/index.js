import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import patientRoutes from './module/patient'
import doctorRoutes from './module/doctor'
import administratorRoutes from './module/administrator'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

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
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: commonRoutes.concat(otherRoutes)   
})

let router = createRouter(otherRoutes)

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
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
  // const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  return newRoute
}

export default router
