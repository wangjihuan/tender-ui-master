<template>
  <div class="supplier-bg">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <BackTop></BackTop>
    <Modal width="700" v-model="modalAchievement" :title="lxname" :mask-closable="false"
           :loading="true">
      <Form ref="achievement" :model="achievement">
        <FormItem prop="one" class="">
          <Input v-model="achievement.achievementOne" type="textarea" :rows="4" placeholder="业绩一（必填）"
                 :readonly="true"></Input>
        </FormItem>
        <FormItem prop="two" class="form-item-register">
          <Input v-model="achievement.achievementTwo" type="textarea" :rows="4" placeholder="业绩二（必填）"
                 :readonly="true"></Input>
        </FormItem>
        <FormItem prop="three" class="form-item-register">
          <Input v-model="achievement.achievementThree" type="textarea" :rows="4" placeholder="业绩三（必填）"
                 :readonly="true"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <!--<Button type="primary" @click="ok2('achievement')">确定</Button>-->
      </div>
    </Modal>
    <Card class="supplier">
      <p slot="title" style="font-size: 20px">
        供应商信息
      </p>
      <div style="text-align: right">
        <!--<Button type="success" @click="submitApprove('')" class="supplier-edit">提交审核</Button>-->
        <!--<Button type="success" v-if="isApprove" @click="approve('')" class="supplier-edit">审核</Button>-->
        <!--<Button type="success" v-if="isShowPass" @click="pass('')" class="supplier-edit">通过审核</Button>-->
        <!--<Button type="error" v-if="isShowPass" @click="nopass('')" class="supplier-edit">不通过审核</Button>-->
        <Button type="error" v-if="isOff" @click="off('')" class="supplier-edit">禁用</Button>
        <Button type="success" v-if="isOn" @click="on('')" class="supplier-edit">启用</Button>
        <Button type="success" v-if="isSave" @click="save('')" class="supplier-edit">保存</Button>
        <Button type="warning" v-if="isEdit" @click="edit('')" class="supplier-edit">维护</Button>
        <Button type="primary" @click="returnList('')" class="supplier-edit">返回</Button>
      </div>
      <br/>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">企业名称：</Col>
        <Col span="7" style="text-align: left">{{supplier.companyName}}</Col>
        <Col span="5" style="text-align: right">企业邮箱：</Col>
        <Col span="7" style="text-align: left">{{supplier.companyEmail}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">组织机构代码证：</Col>
        <Col span="7" style="text-align: left">{{supplier.orgCode}}</Col>
        <Col span="5" style="text-align: right">联系人：</Col>
        <Col span="7" style="text-align: left">{{supplier.contact}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">联系人电话：</Col>
        <Col span="7" style="text-align: left">{{supplier.contactPhone}}</Col>
        <Col span="5" style="text-align: right">公司电话：</Col>
        <Col span="7" style="text-align: left">{{supplier.companyPhone}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">企业注册资金：</Col>
        <Col span="7" style="text-align: left">{{`￥ ${supplier.regAmt}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
          ',')}}
        </Col>
        <Col span="5" style="text-align: right">施工能力额度：</Col>
        <Col span="7" style="text-align: left">{{supplier.amount}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">审核状态：</Col>
        <Col span="7" style="text-align: left">
          <Tag :color="colors">{{userStatu}}</Tag>
        </Col>
        <Col span="5" style="text-align: right">是否启用：</Col>
        <Col span="7" style="text-align: left">
          <Tag :color="enabledColor">{{enabled}}</Tag>
        </Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">是否甲方推荐：</Col>
        <Col span="7" style="text-align: left">
          <Switch v-model="switch1" @on-change="change" size="large" :disabled="flag">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </Switch>
        </Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <!--<CheckboxGroup v-model="resultArr" @on-change="checkChange">-->
        <!--<Checkbox :label="item.id+':'+item.name" v-for="item in searchArr" v-bind:key="item.id">{{item.name}}</Checkbox>-->
        <!--</CheckboxGroup>-->
        <Col span="5" style="text-align: right">类型：</Col>
        <Col span="19" style="text-align: left">
          <CheckboxGroup v-model="checkbox" @on-change="checkChange" :onclick="flag1">
            <Checkbox :label="key" v-for="(value, key) in userTypes" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </Col>
      </Row>
      <Row :gutter="30" class="supplier-row" v-if="isCl">
        <Col span="5" style="text-align: right">
          <Button type="primary" @click="viewYj('cl')" size="small" title="点击查看业绩">材料：</Button>
        </Col>
        <Col span="19" style="text-align: left">
          <CheckboxGroup v-model="checksubbox1" @on-change="subChange1" :onclick="flag1">
            <Checkbox :label="key" v-for="(value, key) in userSubTypes1" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </Col>
      </Row>
      <Row :gutter="30" class="supplier-row" v-if="isLw">
        <Col span="5" style="text-align: right">
          <Button type="primary" @click="viewYj('lw')" size="small" title="点击查看业绩">劳务：</Button>
        </Col>
        <Col span="19" style="text-align: left">
          <CheckboxGroup v-model="checksubbox2" @on-change="subChange2" :onclick="flag1">
            <Checkbox :label="key" v-for="(value, key) in userSubTypes2" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </Col>
      </Row>
      <Row :gutter="30" class="supplier-row" v-if="isMm">
        <Col span="5" style="text-align: right">
          <Button type="primary" @click="viewYj('mm')" size="small" title="点击查看业绩">苗木：</Button>
        </Col>
        <Col span="19" style="text-align: left">
          <CheckboxGroup v-model="checksubbox3" @on-change="subChange3" :onclick="flag1">
            <Checkbox :label="key" v-for="(value, key) in userSubTypes3" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">企业资质：</Col>
        <Col span="19" style="text-align: left">
          <Select v-model="qualifications" style="text-align: left" @on-open-change="zzChange" filterable
                  multiple
                  :disabled="flag">
            <Option v-for="item in qualificationList" :value="item.id" :key="item.id">{{ item.zzName }}</Option>
          </Select>
        </Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align: right">公司地址：</Col>
        <Col span="19" style="text-align: left">{{supplier.companyAddr}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="5" style="text-align:right">证照信息：</Col>
        <Col span="7" style="text-align: left"  v-if="supplier.credentials!=null&&supplier.credentials!=''">
          <Button type="primary" @click="downloadTenderFile" :loading="isDownload" title="点击下载">
            {{supplier.companyName}}.zip
          </Button>
        </Col>
        <Col span="7" style="text-align: left"  v-if="supplier.credentials==null||supplier.credentials==''">
          <p style="color: red;font-size: 15px">未上传证照信息</p>
        </Col>
      </Row>
    </Card>
  </div>

</template>
<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'

  export default {
    data() {
      return {
        id: 0,
        isJz: '',
        typ: '',
        subTyp: '',
        subTyp1: [],
        subTyp2: [],
        subTyp3: [],
        spinShow:false,
        flag: true,
        flag1: 'return false',
        isCl: false,
        isLw: false,
        isMm: false,
        isOff: true,
        isOn: false,
        isEdit: true,
        isSave: false,
        isApprove: false,
        isShowPass: false,
        userTypes: [],
        qualificationList: [],
        userSubTypes1: [],
        userSubTypes2: [],
        userSubTypes3: [],
        checkbox: [],
        qualifications:[],
        checksubbox1: [],
        checksubbox2: [],
        checksubbox3: [],
        modalAchievement: false,
        lxname: '',
        achievement: {
          achievementOne: '',
          achievementTwo: '',
          achievementThree: '',
        },
        suppliers: {},
        supplier: {
          companyName: '',
          companyEmail: '',
          orgCode: '',
          password: '',
          passwordCheck: '',
          contact: '',
          contactPhone: '',
          companyPhone: '',
          companyAddr: '',
          businessType: [],
          credentials: [],
          isEnabled: '',
          typ: '',
          status: '',
          isJz: '',

        },
        checkbox: [],
        oldCheckBox: [],
        switch1: false,
        fileName: '',
        //是否正在下载
        isDownload: false,
        userStatu: '',
        colors: '',
        enabledColor: '',
        enabled: '',
        enableds: {
          "0": "已停用",
          "1": "可用",
        },
        colorss: {
          "1": "primary",
          "2": "success",
          "3": "error",
          "4": "warning",
        },
        enabledColors: {
          "0": "error",
          "1": "success",
        },
        userStatus: {
          "4": "待激活",
          "1": "审核中",
          "2": "已审核",
          "3": "未通过",
        },
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getData(this.id)
      this.getTypeDictInfo();//加载业务类型
      this.getSubType();//加载业务类型子类
      this.getQualificationList();
    },
    methods: {
      getData(id) {
        this.$http.get(api.SUPPLIER_ID + "/" + id).then(res => {
          let result = res.data.data;
          this.supplier = result
          if (result.amount == 1) {
            this.supplier.amount = "100-500万元";
          } else if (result.amount == 2) {
            this.supplier.amount = "500-1000万元";
          } else if (result.amount == 3) {
            this.supplier.amount = "1000-2000万元";
          } else {
            this.supplier.amount = "2000万以上";
          }
          this.fileName = this.supplier.companyName + ".zip";
          this.userStatu = this.userStatus[result.status];
          this.colors = this.colorss[result.status];
          this.enabled = this.enableds[result.isEnabled];
          this.enabledColor = this.enabledColors[result.isEnabled];
          if (result.status == 1) {
            this.isApprove = true
          }
          if (result.status != 3) {
            if (result.isEnabled == 1) {
              this.isOff = true;
              this.isOn = false
            } else {
              this.isOff = false;
              this.isOn = true
            }
          } else {
            this.isOff = false;
            this.isOn = false
          }
          //审批时不显示按钮
          if (this.$route.query.component == "shenpi") {
            this.isEdit = false,
              this.isOff = false
          }

          //开关状态
          if (result.isJz == 1) {
            this.switch1 = true
          }
          //复选框
          this.checkbox = result.typ.split(",");
          this.qualifications=result.qualification.split(",");
          // this.oldCheckBox = result.typ.split(",");
          result.subTyp.split(",").forEach((o) => {
            if (o.substring(0, o.indexOf("-")) == "cl") {
              this.checksubbox1.push(o);
            }
            if (o.substring(0, o.indexOf("-")) == "lw") {
              this.checksubbox2.push(o);
            }
            if (o.substring(0, o.indexOf("-")) == "mm") {
              this.checksubbox3.push(o);
            }
          })
          this.isJz = result.isJz;
          this.typ = result.typ;
          // this.subTyp = result.subTyp;
          this.subTyp1 = this.checksubbox1;
          this.subTyp2 = this.checksubbox2;
          this.subTyp3 = this.checksubbox3;
          if (result.typ.indexOf("cl") >= 0) {
            this.isCl = true;
          }
          if (result.typ.indexOf("lw") >= 0) {
            this.isLw = true;
          }
          if (result.typ.indexOf("mm") >= 0) {
            this.isMm = true;
          }
        })
      },
      returnList() {
        this.$router.go(-1)
      },
      viewYj(lx) {
        if (lx == "cl") {
          this.lxname = "材料业绩";
        }
        if (lx == "lw") {
          this.lxname = "劳务业绩";
        }
        if (lx == "mm") {
          this.lxname = "苗木业绩";
        }
        this.lxname = this.lxname;
        let path = "?lx=" + lx +
          "&id=" + this.id;
        this.$http.get(api.SUPPLIER_ACHIEVEMENT + path).then((res) => {
          if (res.data.status != 200) {
            return;
          }
          if (res.data.data == null || res.data.data == "") {
            this.$Message.warning('该类型暂无业绩!');
            return;
          }
          this.achievement = res.data.data;
          this.modalAchievement = true;
        })
      },
      //打开企业资质
      zzChange() {
        this.qualification = this.qualifications.toString();
      },
      change(status) {
        if (status) {
          this.isJz = 1
        } else {
          this.isJz = 0
        }
      },

      checkChange(data) {
        if (this.checkbox.length != 1) {
          this.$Message.error('类别必填且最多选一项!');
        }
        // let oldCheckBox = this.oldCheckBox;
        // if (oldCheckBox.length > data.length) {
        //   //减少时
        //   let filter = oldCheckBox.filter(key => !data.includes(key));
        //   //减少的元素
        //   let filterElement = filter[0];
        //   let checksubbox = this.checksubbox;
        //   let filter1 = checksubbox.filter(key => key.indexOf(filterElement) < 0);
        //   this.checksubbox = filter1;
        // }
        // this.oldCheckBox = data;
        let lx = this.checkbox.toString().split(",");
        if (lx.indexOf("cl") >= 0) {
          this.isCl = true;
        } else {
          this.isCl = false;
          this.checksubbox1 = [];
        }
        if (lx.indexOf("lw") >= 0) {
          this.isLw = true;
        } else {
          this.isLw = false;
          this.checksubbox2 = [];
        }
        if (lx.indexOf("mm") >= 0) {
          this.isMm = true;
        } else {
          this.isMm = false;
          this.checksubbox3 = [];
        }
        this.typ = this.checkbox.toString();
        this.subTyp1 = this.checksubbox1;
        this.subTyp2 = this.checksubbox2;
        this.subTyp3 = this.checksubbox3;
      },
      subChange1(data) {
        // this.checksubbox.toString().split(",").forEach((o) => {
        //   if (this.checkbox.toString().indexOf(o.substring(0, 2)) == -1) {
        //     this.$Message.error('请先选择类别!');
        //     return;
        //   }
        // })
        this.subTyp1 = this.checksubbox1;
      },
      subChange2(data) {
        this.subTyp2 = this.checksubbox2;
      },
      subChange3(data) {
        this.subTyp3 = this.checksubbox3;
      },
      //业务类型
      getTypeDictInfo() {
        this.$http.get(api.TENDER_DICT_TYPE).then(res => {
            if (res.data.status !== 200) {
              return;
            }
            let dictData = res.data.data;
            let data = {};
            dictData.forEach((o) => {
              data[o.code] = o.name;
            });
            this.userTypes = data;
          }
        )
      },
      //业务类型子类
      getSubType() {
        this.$http.get(api.SUB_TYPE_CLASS).then(res => {
          if (res.data.status !== 200) {
            return;
          }
          let dictData1 = res.data.data;
          let data1 = {};
          let data2 = {};
          let data3 = {};
          dictData1.forEach((o) => {
            if (o.type == "cl") {
              data1[o.type + '-' + o.id] = o.className;
            } else if (o.type == "lw") {
              data2[o.type + '-' + o.id] = o.className;
            } else if (o.type == "mm") {
              data3[o.type + '-' + o.id] = o.className;
            }
          });
          this.userSubTypes1 = data1;
          this.userSubTypes2 = data2;
          this.userSubTypes3 = data3;
        })
      },
      getQualificationList() {
        this.$http.get(api.QUALIFICATION).then(res => {
          if (res.data.status !== 200) {
            return;
          }
          this.qualificationList = res.data.data;
        })
      },
      approve() {
        this.isShowPass = true;
        this.isApprove = false;
        this.isEdit = false;
        this.flag = false
        this.flag1 = 'return true'

      },
      off() {
        // let tips = confirm("确定暂停该供应商吗?")
        this.$Modal.confirm({
          title: "确定暂停该供应商吗?",
          // content:'删除！',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.$http.get(api.SUPPLIER_OFF + this.id).then(res => {
              if (res.data.status == 200) {
                Message.message(res.data);
                this.getData(this.id)
              } else {
                this.$Message.error('操作失败!');
              }
            })
          },
        });
      },
      on() {
        // let tips = confirm("确定启用该供应商吗?")
        this.$Modal.confirm({
          title: "确定启用该供应商吗?",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.$http.get(api.SUPPLIER_ON + this.id).then(res => {
              if (res.data.status == 200) {
                Message.message(res.data);
                this.getData(this.id)
              } else {
                this.$Message.error('操作失败!');
              }
            })
          },
        });
      },
      nopass() {
        this.$http.get(api.SUPPLIER_APPROVE_NO + this.id).then(res => {
          if (res.data.status == 200) {
            Message.message(res.data);
            // this.flag = true,
            this.isApprove = false,
              this.isShowPass = false,
              this.isEdit = false,
              this.flag = true,
              this.flag1 = 'return false',
              this.getData(this.id)
            // this.$Message.success('操作成功!');
          } else {
            this.$Message.error('操作失败!');
          }
        })
      },
      pass() {
        this.suppliers.id = this.id;
        this.suppliers.typ = this.typ;
        this.suppliers.isJz = this.isJz;
        this.$http.post(api.SUPPLIER_APPROVE, this.suppliers).then(res => {
          if (res.data.status == 200) {
            Message.message(res.data);
            // this.flag = true,
            this.isApprove = false,
              this.isShowPass = false,
              this.isEdit = true,
              this.isOff = true,
              this.flag = true,
              this.flag1 = 'return false',
              this.getData(this.id)
            // this.$Message.success('操作成功!');
          } else {
            this.$Message.error('操作失败!');
          }
        })
      },
      save() {
        if (this.typ == "") {
          this.$Message.error('类别不能为空!');
          return
        }
        if (this.checkbox.length != 1) {
          this.$Message.error('类别必填且最多选一项!');
          return;
        }
        // if (this.qualifications.length == 0) {
        //   this.$Message.error('请选择资质!');
        //   return;
        // }
        let flag3 = true;
        this.checkbox.forEach((o) => {
          if (o == "cl" && this.subTyp1 == "") {
            this.$Message.error('请勾选材料对应的明细!');
            flag3 = false;
            return;
          }
          if (o == "lw" && this.subTyp2 == "") {
            this.$Message.error('请勾选劳务对应的明细!');
            flag3 = false;
            return;
          }
          if (o == "mm" && this.subTyp3 == "") {
            this.$Message.error('请勾选苗木对应的明细!');
            flag3 = false;
            return;
          }
        })
        if (flag3 == false) {
          return;
        }
        this.spinShow=true;
        //获取subTyp
        this.subTyp1.push.apply(this.subTyp1, this.subTyp2)
        let arr = this.subTyp1;
        arr.push.apply(arr, this.subTyp3)
        let tmp = new Array();
        for (var i in arr) {
          //该元素在tmp内部不存在才允许追加
          if (tmp.indexOf(arr[i]) == -1) {
            tmp.push(arr[i]);
          }
        }
        this.suppliers.id = this.id;
        this.suppliers.typ = this.typ;
        this.suppliers.subTyp = tmp.toString();
        this.suppliers.isJz = this.isJz;
        this.suppliers.companyName = this.supplier.companyName;
        this.suppliers.companyPhone = this.supplier.companyPhone;
        this.suppliers.companyAddr = this.supplier.companyAddr;
        this.suppliers.orgCode = this.supplier.orgCode;
        this.suppliers.contact = this.supplier.contact;
        this.suppliers.contactPhone = this.supplier.contactPhone;
        this.suppliers.province = this.supplier.province;
        this.suppliers.qualification=this.qualifications.toString();

        this.$http.post(api.SUPPLIER_EDIT, this.suppliers).then(res => {
          if (res.data.status == 200) {
            Message.message(res.data);
            // this.flag = true,
            this.isApprove = true,
              this.isShowPass = false,
              this.isEdit = true,
              this.isSave = false,
              this.isOff = true,
              this.flag = true,
              this.flag1 = 'return false',
              this.checksubbox1 = [],
              this.checksubbox2 = [],
              this.checksubbox3 = [],
              this.subTyp1 = [],
              this.subTyp2 = [],
              this.subTyp3 = [],
              this.getData(this.id)
            // this.$Message.success('操作成功!');
          } else {
            this.$Message.error('操作失败!');
          }
          this.spinShow=false;
        })
      },
      edit() {
        this.isEdit = false,
          this.isSave = true,
          this.isApprove = false,
          this.isOff = false,
          this.isOn = false,
          this.flag = false,
          this.flag1 = 'return true'
      },
      //下载标书文件
      downloadTenderFile() {
        this.isDownload = true;
        this.$http({
          method: 'post',
          url: api.SUPPLIER_DOWNLOAD,
          data: {
            id: this.supplier.id,
            fileName: this.fileName,
            fileId: this.supplier.credentials
          },
          responseType: 'blob'
        }).then(response => {
          const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
          const aEle = document.createElement('a');     // 创建a标签
          const href = window.URL.createObjectURL(blob);       // 创建下载的链接
          aEle.href = href;
          aEle.download = this.fileName;  // 下载后文件名
          document.body.appendChild(aEle);
          aEle.click();     // 点击下载
          document.body.removeChild(aEle); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放掉blob对象
          this.isDownload = false;
        }).catch((error) => {
          this.isDownload = false;
        })
      },
      submitApprove() {
        //提交审核
        this.suppliers.id = this.id;
        this.suppliers.typ = this.typ;
        this.suppliers.isJz = this.isJz;
        this.$http.post(api.SUPPLIER_APPROVE, this.suppliers).then(res => {
          if (res.data.status == 200) {
            Message.message(res.data);
            // this.flag = true,
            this.isApprove = false,
              this.isShowPass = false,
              this.isEdit = true,
              this.isOff = true,
              this.flag = true,
              this.flag1 = 'return false',
              this.getData(this.id)
            // this.$Message.success('操作成功!');
          } else {
            this.$Message.error('操作失败!');
          }
        })
      }

    }
  }
</script>
<style>
  .supplier-bg {
    height: 100%;
    width: 100%;
    padding-top: 25px;
    padding-bottom: 25px;
  }

  .supplier {
    padding: 16px;
    padding-bottom: 32px;
    margin: 0px auto;
    max-width: 80%;
    text-align: center;
  }

  .supplier-row {
    margin-top: 10px;
  }

  .supplier-edit {
    margin-top: 32px;

  }
</style>
