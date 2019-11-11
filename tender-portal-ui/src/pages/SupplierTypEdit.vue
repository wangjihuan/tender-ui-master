<template>
  <div class="register-bg">
    <Card icon="log-in" title="类型/资质修改" :bordered="false" class="register">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="left">

        <FormItem prop="regAmt" label="注册资金" style="text-align: left">
          <Poptip trigger="focus">
            <Input v-model="formValidate.regAmt" placeholder="注册资金(元)"/>
            <div slot="content">{{ formatNumber }}</div>
          </Poptip>
        </FormItem>
        <FormItem prop="amount" label="规模" style="text-align: right">
          <Select v-model="formValidate.amount" placeholder="选择规模" style="text-align: left">
            <Option v-for="item in constructionAmtList" :value="item.code" :key="item.code">{{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem prop="province" label="业务省份">
          <Select v-model="formValidate.province" placeholder="业务省份" style="text-align: left">
            <Option v-for="(value ,key) in provinces" :value="key" :key="key">{{ value }}</Option>
          </Select>
        </FormItem>

        <FormItem label="企业资质" prop="qualification" style="text-align: right">
          <Select v-model="formValidate.qualification" style="text-align: left" @on-open-change="zzChange"
                  placeholder="请选择资质" filterable multiple>
            <Option v-for="item in qualificationList" :value="item.id" :key="item.id">{{ item.zzName }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="types" label="类型" style="text-align: left;">
          <RadioGroup v-model="formValidate.typ" @on-change="typesChange">
            <Radio :label="key" v-for="(value, key) in userTypes" :key="key">{{value}}</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="材料：" style="text-align: left;" v-if="isCl">
          <CheckboxGroup v-model="checksubbox1" @on-change="subChange1">
            <Checkbox :label="key" v-for="(value, key) in userSubTypes1" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="劳务：" style="text-align: left;" v-if="isLw">
          <CheckboxGroup v-model="checksubbox2" @on-change="subChange2">
            <Checkbox :label="key" v-for="(value, key) in userSubTypes2" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="苗木：" style="text-align: left;" v-if="isMm">
          <CheckboxGroup v-model="checksubbox3" @on-change="subChange3">
            <Checkbox :label="key" v-for="(value, key) in userSubTypes3" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </FormItem>

        <Divider/>
        <FormItem prop="one" label="业绩一" class="">
          <Input v-model="one" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                 placeholder="业绩一（必填）"></Input>
        </FormItem>
        <FormItem prop="two" label="业绩二" class="form-item-register">
          <Input v-model="two" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                 placeholder="业绩二（必填）"></Input>
        </FormItem>
        <FormItem prop="three" label="业绩三" class="form-item-register">
          <Input v-model="three" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                 placeholder="业绩三（必填）"></Input>
        </FormItem>
        <Divider/>
        <Button type="success" @click="handleSubmit('formValidate')" v-if="formValidate.status==2">提交</Button>
      </Form>
    </Card>
  </div>
</template>
<script>
  import * as api from '../api/api'
  import * as utils from "../common/utils"

  export default {
    data() {
      return {
        formValidate: {
          id: '',
          regAmt: '',
          amount: '',
          qualification: '',
        },
        isCl: false,
        isLw: false,
        isMm: false,
        userSubTypes1: [],
        userSubTypes2: [],
        userSubTypes3: [],
        checksubbox1: [],
        checksubbox2: [],
        checksubbox3: [],
        subTyp1: [],
        subTyp2: [],
        subTyp3: [],
        one:'',
        two:'',
        three:'',
        userTypes: [],
        qualificationList: [],
        constructionAmtList: [],
        provinces: {},
      }
    },
    computed: {
      formatNumber() {
        if (this.formValidate.regAmt === '') return '请确认金额';
        return utils.numFormat(this.formValidate.regAmt);
      },
    },
    created() {
      this.getTypeDictInfo();
      this.getQualificationType();
      this.getSubType();//业务类型子类
      this.provinces = this.$store.state.provinces;
      this.getData();
    },
    methods: {
      getData() {
        this.$http.get(api.USER_INFO).then(res => {
          if (res.data.status === 200) {
            let result = res.data.data;
            this.formValidate = result;

            let path = "?lx=" + result.typ +
              "&id=" + result.id;
            this.$http.get(api.USER_YJ + path).then(res => {
              if (res.data.status === 200) {
                this.one = res.data.data.achievementOne;
                this.two = res.data.data.achievementTwo;
                this.three = res.data.data.achievementThree;
              }
            });
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
            this.typ = result.typ;
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
            if (result.qualification != null && result.qualification != "") {
              this.formValidate.qualification = result.qualification.split(",");
            } else {
              this.formValidate.qualification = [];
            }
          }
        })
      },
      zzChange() {
        this.qualification = this.formValidate.qualification.toString();
      },
      getTypeDictInfo() {
        this.$http.get(api.REGISTER_DICT_TYPE).then(res => {
            if (res.data.status !== 200) {
              return;
            }
            //获得user_type/qualification_type字典列表
            let dictData = res.data.data;
            let data = {};
            dictData.forEach((o) => {
              if (o.dictCode === "user_type") {
                //转换为对象
                data[o.code] = o.name;
              } else if (o.dictCode === "construction_amt_type") {
                //转换为数组 施工金额
                this.constructionAmtList.push(o);
              }
            });
            this.userTypes = data;
          }
        );
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
      subChange1(data) {
        this.subTyp1 = this.checksubbox1;
      },
      subChange2(data) {
        this.subTyp2 = this.checksubbox2;
      },
      subChange3(data) {
        this.subTyp3 = this.checksubbox3;
      },
      getQualificationType() {
        this.$http.get(api.QUALIFICATION_LIST).then(res => {
          if (res.data.status !== 200) {
            return;
          }
          this.qualificationList = res.data.data
        });
      },
      typesChange(arr) {
        //小类
        let lx = arr;
        if (lx.indexOf("cl") >= 0) {
          this.isCl = true;
        } else {
          this.isCl = false;
        }
        if (lx.indexOf("lw") >= 0) {
          this.isLw = true;
        } else {
          this.isLw = false;
        }
        if (lx.indexOf("mm") >= 0) {
          this.isMm = true;
        } else {
          this.isMm = false;
        }
        this.checksubbox1 = [];
        this.checksubbox2 = [];
        this.checksubbox3 = [];
      },
      handleSubmit(name) {
        let type = this.formValidate.typ;
        if (type.indexOf("cl") < 0) {
          this.subTyp1 = [];
        }
        if (type.indexOf("lw") < 0) {
          this.subTyp2 = [];
        }
        if (type.indexOf("mm") < 0) {
          this.subTyp3 = [];
        }
        if (this.formValidate.regAmt == null || this.formValidate.regAmt == "") {
          this.$Message.error('注册金额不能为空!');
        }
        if (this.formValidate.qualification == null || this.formValidate.qualification == "") {
          this.$Message.error('资质不能为空!');
          return;
        }
        if (type == "cl" && this.subTyp1 == "") {
          this.$Message.error('材料对应的明细不能为空!');
          return;
        }
        if (type == "lw" && this.subTyp2 == "") {
          this.$Message.error('劳务对应的明细不能为空!');
          return;
        }
        if (type == "mm" && this.subTyp3 == "") {
          this.$Message.error('苗木对应的明细不能为空!');
          return;
        }
        if(this.one==null||this.one==""){
          this.$Message.error('业绩一必填!');
          return;
        }
        if(this.two==null||this.two==""){
          this.$Message.error('业绩二必填!');
          return;
        }
        if(this.three==null||this.three==""){
          this.$Message.error('业绩三必填!');
          return;
        }
        this.$Modal.confirm({
          title:"提交更改后需等待审核通过后方可重新投标，确定提交？",
          width:"40%",
          okText:'确定',
          cancelText:'取消',
          onOk:()=>{
            this.formValidate.qualification = this.formValidate.qualification.toString();
            this.formValidate.subTyp = this.subTyp1.concat(this.subTyp2).concat(this.subTyp3).toString();
            this.formValidate.one=this.one;
            this.formValidate.two=this.two;
            this.formValidate.three=this.three;
            this.$http.post(api.USER_TYP_EDIT, this.formValidate).then(res => {
              if (res.data.data == "ok") {
                this.$Message.success('修改成功!');
                this.checksubbox1 = [],
                  this.checksubbox2 = [],
                  this.checksubbox3 = [],
                  this.subTyp1 = [],
                  this.subTyp2 = [],
                  this.subTyp3 = [],
                  this.getData();
              } else {
                this.$Message.error('修改失败!');
              }
            })
          },
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style>
  .register-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .register {
    padding: 16px;
    margin: 0px auto;
    max-width: 40%;
    text-align: center;
    background-color: #ffffff;
  }
</style>
