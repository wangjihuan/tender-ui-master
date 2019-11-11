import axios from "axios";
import auth from "./auth";
import {getBaseUrl} from "../common/utils";
import {Message} from "iview"
import router from '../router'

// axios 配置
axios.defaults.timeout = 1000 * 20;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.baseURL = getBaseUrl(window.location.href);
// axios.defaults.headers.common['authUid'] = auth.getUid();
// axios.defaults.headers.common['authSid'] = auth.getSid();

//POST传参序列化
axios.interceptors.request.use((config) => {
  // debugger
  config.headers['access-token'] = auth.getToken();
  config.headers['App-Id'] = auth.getAppId();
  if (config.headers && config.headers["Content-type"]) {
    if (config.headers["Content-type"] === "multipart/form-data") {
      //上传文件
      return config;
    } else if (config.headers["Content-type"] === "application/x-www-form-urlencoded;charset=utf-8") {
      //登录请求
      return config;
    }
  }

  config.headers['Content-Type'] = 'application/json;charset=utf-8'
  config.data = JSON.stringify(config.data)
  return config;

  // if (config.method === 'post') {
  //   console.log(config.url.indexOf(api.AUTH))
  //   if (config.url.indexOf(api.AUTH) > 0) {
  //     // config.data = qs.stringify(config.data);
  //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  //     return config
  //   }
  // }

}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(
  response => {
    auth.setToken(response.headers['access-token']);
    auth.setAppId(response.headers['app-id']);
    return Promise.resolve(response);
  },
  err => {
    if (err && err.response) {
      console.log(err)
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          // debugger
          err.message = '请重新登录'
          auth.logout();
          router.push({
            path: "/login"
          });
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
    Message.error(err.message)
    return Promise.reject(err.response)

  });

export default axios
