import vue from 'vue'
import vuex from 'vuex'
// import user from './module/user'
// import app from './module/app'

vue.use(vuex)
const state = {
  token: '',
  appId: '',
  userid: '',
  username: '',
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
  //招标审核、开标审核 通用
  tenderOpenStatus: {
    "1": "审核中",
    "2": "已审核",
    "3": "未通过",
    "0": "未审核",
  },
  tenderOpenStatusColors: {
    "1": "primary",
    "2": "success",
    "3": "error",
    "0": "warning",
  },
  provinceList: [
    // {
    //   code: "all",
    //   province: "全国"
    // },
    {
      code: "beijing",
      province: "北京"
    },
    {
      code: "tianjin",
      province: "天津"
    },
    {
      code: "shanghai",
      province: "上海"
    },
    {
      code: "chongqing",
      province: "重庆"
    },
    {
      code: "hebei",
      province: "河北"
    },
    {
      code: "shangxi",
      province: "山西"
    },
    {
      code: "shanghai",
      province: "陕西"
    },
    {
      code: "shanghai",
      province: "山西"
    },
    {
      code: "shandong",
      province: "山东"
    },

    {
      code: "hennan",
      province: "河南"
    },
    {
      code: "liangning",
      province: "辽宁"
    },
    {
      code: "jilin",
      province: "吉林"
    },


    {
      code: "sichuan",
      province: "四川"
    },
    {
      code: "heilongjiang",
      province: "黑龙江"
    },
    {
      code: "jiangsu",
      province: "江苏"
    },

    {
      code: "zhejiang",
      province: "浙江"
    },
    {
      code: "anhui",
      province: "安徽"
    },
    {
      code: "jiangxi",
      province: "江西"
    },
    {
      code: "fujian",
      province: "福建"
    },
    {
      code: "hubei",
      province: "湖北"
    },
    {
      code: "hunan",
      province: "湖南"
    },
    {
      code: "guizhou",
      province: "贵州"
    },
    {
      code: "yunnan",
      province: "云南"
    },
    {
      code: "guangdong",
      province: "广东"
    },
    {
      code: "hainan",
      province: "海南"
    },
    {
      code: "gansu",
      province: "甘肃"
    },
    {
      code: "qinghai",
      province: "青海"
    },
    {
      code: "taiwan",
      province: "台湾"
    },
    {
      code: "neimenggu",
      province: "内蒙古"
    },
    {
      code: "xinjiang",
      province: "新疆"
    },
    {
      code: "xizang",
      province: "西藏"
    },
    {
      code: "guangxi",
      province: "广西"
    },
    {
      code: "ningxi",
      province: "宁夏"
    }
  ],
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
    "anhui": "安徽",
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
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    // user,
    // app
  }
})
