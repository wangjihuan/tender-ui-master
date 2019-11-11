import store from "../store";

export default {
  randomString: function (len, radix) {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  getUid: function () {
    var uid = window.localStorage.getItem('imp-uuid');
    if (!uid) {
      uid = this.randomString(32);
      window.localStorage.setItem('imp-uuid', uid);
    }
    return uid;
  },
  login(token, callback) {
    window.localStorage.setItem('imp-sid', token);
    if (callback) callback();
  },
  setToken(token) {
    if (!token) {
      return;
    }
    store.state.token = token;
    window.localStorage.setItem('access-token', token);
  },
  getToken() {
    let token = store.state.token;
    if (!token) {
      token = window.localStorage.getItem('access-token')
    }
    return token;
  },
  setAppId(appId) {
    if (!appId) {
      return;
    }
    store.state.appId = appId;
    window.localStorage.setItem('app-id', appId);
  },
  getAppId() {
    let appId = store.state.appId;
    if (appId) {
      return appId;
    }
    return window.localStorage.getItem('app-id');
  },
  savePermission(authorities) {
    // 栗子： authorities:{authority : "/supplier/list"}
    store.state.authorities = authorities;
    window.localStorage.setItem('authorities', authorities);
  },
  getPermission() {
    let authorities = store.state.authorities;
    if (authorities) {
      return authorities
    }
    return window.localStorage.getItem('authorities');
  },
  getCompanyName() {
    // debugger
    let info = store.state.companyName;
    if (!info) {
      info = window.localStorage.getItem('companyName');
    }
    return info;
  },
  saveCompanyName(companyName) {
    store.state.companyName = companyName;
    window.localStorage.setItem('companyName', companyName);
  },
  matchPath(path) {
    //正则表达式判断是否有菜单权限
    let authorities = getPermission();
    if (!authorities || authorities.length === 0) {
      return false;
    }
    for (let i = 0; i < authorities.length; i++) {

    }
  },
  saveUserid(userid) {
    store.state.userid = userid;
    window.localStorage.setItem('userid', userid);
  },
  getUserid() {
    // debugger
    let userid = store.state.userid;
    if (userid) {
      return userid;
    }
    userid = window.localStorage.getItem('userid');
    store.state.userid = userid;
    return userid;
  },
  logout(cb) {
    store.state.token = '';
    store.state.appId = '';
    store.state.userid = '';
    store.state.companyName = '';
    window.localStorage.removeItem('access-token');
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('app-id');
    if (cb) cb()
  },
  loggedIn() {
    let token = store.state.token;
    if (!!token) {
      return true;
    }
    return !!window.localStorage.getItem('access-token');
  },

}
