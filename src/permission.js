import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import { getToken, getRole } from '@/utils/auth' 
import { resetRouter } from '@/router'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
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
      router.options.routes = resetRouter(role)
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
