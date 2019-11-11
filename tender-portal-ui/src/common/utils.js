import pathToRegexp from "path-to-regexp";
import {Message} from 'iview'
import store from "../store";

export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[key] = key
      }
    }
  }
  return mirrored
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = array.map(item => ({...item}))
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function getCurrentMenu(location, arrayMenu) {
  if (!!arrayMenu) {
    let current = []
    for (let i = 0; i < arrayMenu.length; i++) {
      const e = arrayMenu[i];
      const child = getCurrentMenu(location, e.children);
      if (!!child && child.length > 0) {
        child.push({...e, children: null});
        return child;
      }
      if (e.href && pathToRegexp(e.href).exec(location)) {
        current.push({...e, children: null});
        return current;
      }
    }
    return current;
  }
  return null;
}

/**
 *
 */
export function message(data) {
  if (data.status == 200) {
    Message.success(data.msg);
  } else {
    Message.error(data.msg);
  }
}

/**
 * 其他通用数据存取方法
 */
export function saveData(key, value) {
  store.state[key] = value;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getData(key) {
  let value = store.state[key];
  if (value) {
    return value;
  }
  value = JSON.parse(window.localStorage.getItem(key));
  store.state[key] = value;
  return value;
}

/**
 * 金额格式化
 */
export function numFormat(val) {
  //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
  let str = (val*1).toFixed(2) + '';
  let intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
  let dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
  let ret = intSum + dot;
  return ret
}

/**
 * 1s禁用,防止重复提交
 */
export function isCanDisabledByTimer(str) {
  let countDown = 60;
  let TIME_COUNT = 60;
  str = false;
  let timer = setInterval(() => {
    if (countDown > 0 && countDown <= TIME_COUNT) {
      countDown--;
    } else {
      clearInterval(timer);
      timer = null;
      str = true;
    }
  }, 1000)

}
/*
 *函数定义
 *入口参数data,平行数组
 *key，id字段
 *parentKey，父字段
 *map,需要将原始属性名称转换为什么名称
 */
export function treeUtil(data, key, parentKey, map) {
  this.data = data;
  this.key = key;
  this.parentKey = parentKey;
  this.treeParentKey = parentKey;   //parentKey要转换成什么属性名称
  this.treeKey = key;           //key要转换成什么属性名称
  this.map = map;
  if (map) {
    if (map[key]) this.treeKey = map[key];
  }
  this.toTree = function () {
    var data = this.data;
    var pos = {};
    var tree = [];
    var i = 0;
    while (data.length != 0) {
      if (data[i][this.parentKey] == 0) {
        var _temp = this.copy(data[i]);
        tree.push(_temp);
        pos[data[i][this.key]] = [tree.length - 1];
        data.splice(i, 1);
        i--;
      } else {
        var posArr = pos[data[i][this.parentKey]];
        if (posArr != undefined) {
          var obj = tree[posArr[0]];
          for (var j = 1; j < posArr.length; j++) {
            obj = obj.children[posArr[j]];
          }
          var _temp = this.copy(data[i]);
          obj.children.push(_temp);
          pos[data[i][this.key]] = posArr.concat([obj.children.length - 1]);
          data.splice(i, 1);
          i--;
        }
      }
      i++;
      if (i > data.length - 1) {
        i = 0;
      }
    }
    return tree;
  }
  this.copy = function (item) {
    var _temp = {
      children: []
    };
    _temp[this.treeKey] = item[this.key];
    for (var _index in item) {
      if (_index != this.key && _index != this.parentKey) {
        var _property = item[_index];
        if ((!!this.map) && this.map[_index])
          _temp[this.map[_index]] = _property;
        else
          _temp[_index] = _property;
      }
    }
    return _temp;
  }

}
