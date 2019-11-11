// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css'
import axios from "./common/axios"
import './assets/fonts/iconfont.css'
import config from './config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.prototype.$http = axios
Vue.axios = axios
Vue.http = axios;
Vue.prototype.$store = store;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

Vue.use(iView, {
  transfer: true,
  size: 'large'
})
Vue.use(ElementUI);
// Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
