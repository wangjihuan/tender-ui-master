import vue from 'vue'
import vuex from 'vuex'
import mutations from './mutation'
import getters from './getter'

vue.use(vuex)

const state = {
  token:'',
  appId: '',
  userid: '',
  companyName: '',
  userStatus: {
    "1": "已报名",
    "2": "已投标",
    "3": "中标",
    "4": "未中标",
  },
  userStatusColors: {
    "1": "primary",
    "2": "#3ce0f0",
    "3": "success",
    "4": "error",
  },
  tenderStatus: {
    "1": "保存",
    "2": "待报名",
    "3": "报名中",
    "4": "报名截止",
    "5": "招标中",
    "6": "评标中",
    "7": "已定标",
    "8": "流标",
  },
  tenderStatusColors: {
    "1": "#8d9eb1",
    "2": "warning",
    "3": "primary",
    "4": "warning",
    "5": "#3ce0f0",
    "6": "#f0d93a",
    "7": "success",
    "8": "error",
  },
  userTenderStatus: null,
  provinces: {
    // "all": "全国",
    "beijing": "北京",
    "tianjin": "天津",
    "shanghai": "上海",
    "chongqing": "重庆",
    "hebei": "河北",
    "shangxi": "山西",
    "shanxi1": "陕西",
    "shanxi2": "山西",
    "shandong": "山东",
    "hennan": "河南",
    "liangning": "辽宁",
    "jilin": "吉林",
    "sichuan": "四川",
    "heilongjiang": "黑龙江",
    "jiangsu": "江苏",
    "zhejiang": "浙江",
    "anhui":"安徽",
    "jiangxi": "江西",
    "fujian": "福建",
    "hubei": "湖北",
    "hunan": "湖南",
    "guizhou": "贵州",
    "yunnan": "云南",
    "guangdong": "广东",
    "hainan": "海南",
    "gansu": "甘肃",
    "qinghai": "青海",
    "taiwan": "台湾",
    "neimenggu": "内蒙古",
    "xinjiang": "新疆",
    "xizang": "西藏",
    "guangxi": "广西",
    "ningxi": "宁夏"
  }
}

export default new vuex.Store({
  state,
  getters,
  mutations
})
