import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getRole } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const role = getRole()
  if (hasToken) {
    if (to.path === '/login'|| to.path === '/'|| to.path=="/login/login") {
      switch (role) {
        case "0":
          next(`/patient`)
          break;
        case "1":
          next(`/doctor`)
          break; 
        case "2":
          next(`/administrator`)
            break; 
        default:
          break;
      }
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
      switch (to.path) {
        case "/login/login":
          next()
          break;
        case "/login/regist":
          next()
          break;
        default:
          next(`/login`)
          break;
      }
      // other pages that do not have permission to access are redirected to the login page.
      NProgress.done()
    
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
