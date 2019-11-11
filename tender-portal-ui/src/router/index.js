import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from "./routes";
import auth from "../common/auth";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routeConfig
});
router.beforeEach((route, redirect, next) => {
  // debugger
  if (route.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (auth.getToken("access_token")) { // 判断当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: route.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  //TODO 可以本地匹配URL限制菜单权限....
  else {
    next();
  }
})
export default router;
