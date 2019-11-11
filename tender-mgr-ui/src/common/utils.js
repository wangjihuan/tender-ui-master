import pathToRegexp from "path-to-regexp";
import {Message} from 'iview'
import store from "../store";
import { forEach, hasOneOf, objEqual } from './tools'

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
export function numFormat(value) {
  if (!value) return '0.00';

  /*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*/
  let intPart = Number(value) | 0; //获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

  let floatPart = ".00"; //预定义小数部分
  let value2Array = value.split(".");

  //=2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString(); //拿到小数部分

    if (floatPart.length === 1) { //补0,实际上用不着
      return intPartFormat + "." + floatPart + '0';
    } else {
      return intPartFormat + "." + floatPart;
    }

  } else {
    return intPartFormat + floatPart;
  }
}

/**
 * 日期格式化
 */
export function getDate(date) {
  if (!date) {
    return '';
  }
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
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

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 深clone
 * @param obj
 * @returns {*}
 */
export const clone = (obj) => {
  var o;
  // 如果  他是对象object的话  , 因为null,object,array  也是'object';
  if (typeof obj === 'object') {

    // 如果  他是空的话
    if (obj === null) {
      o = null;
    }
    else {

      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[ i ]));
        }
      }
      // 如果  他是对象object的话
      else {
        o = {};
        for (var j in obj) {
          o[ j ] = clone(obj[ j ]);
        }
      }

    }
  }
  else {
    o = obj;
  }
  return o;
};
