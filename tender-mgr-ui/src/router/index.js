import Vue from 'vue'
import routeConfig from "./routes";
import auth from "../common/auth";
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode:'history',
  routes: routeConfig
})
router.beforeEach((route, redirect, next) => {
  if (!auth.loggedIn() && route.path !== '/login') {
    next({
      path: '/login',
      query: {redirect: route.fullPath}
    })
  }
  //TODO 可以本地匹配URL限制菜单权限....
  else {
    next()
  }
})
export default router;
