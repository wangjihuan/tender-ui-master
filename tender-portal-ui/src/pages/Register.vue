<template>
  <div class="register-bg">
    <Modal
      v-model="modal1"
      title="感谢您的注册申请！"
      @on-ok="ok">
      <p class="modal-register">我们将尽快为你审核，一般审核需要三个工作日，审核完成过后，我们将通过邮箱的形式，通知到您,请您注意查收！</p>
    </Modal>
    <Modal width="700" v-model="modalAchievement" :title="typeModel2Tile" :closable="false" :mask-closable="false"
           @on-ok="ok2('achievement')" @on-cancel="cancel"
           :loading="true" class-name="vertical-center-modal">
      <Form ref="achievement" :model="achievement" :rules="ruleValidate2">
        <Row :gutter="30" class="supplier-row" v-if="isCl">
          <Col span="19" style="text-align: left">
            <CheckboxGroup v-model="checksubbox1" @on-change="subChange1">
              <Checkbox :label="key" v-for="(value, key) in userSubTypes1" :key="key">{{value}}</Checkbox>
            </CheckboxGroup>
          </Col>
        </Row>
        <Row :gutter="30" class="supplier-row" v-if="isLw">
          <Col span="19" style="text-align: left">
            <CheckboxGroup v-model="checksubbox2" @on-change="subChange2">
              <Checkbox :label="key" v-for="(value, key) in userSubTypes2" :key="key">{{value}}</Checkbox>
            </CheckboxGroup>
          </Col>
        </Row>
        <Row :gutter="30" class="supplier-row" v-if="isMm">
          <Col span="19" style="text-align: left">
            <CheckboxGroup v-model="checksubbox3" @on-change="subChange3">
              <Checkbox :label="key" v-for="(value, key) in userSubTypes3" :key="key">{{value}}</Checkbox>
            </CheckboxGroup>
          </Col>
        </Row>
        <Divider/>
        <FormItem prop="one" class="">
          <Input v-model="achievement.one" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                 placeholder="业绩一（必填）"></Input>
        </FormItem>
        <FormItem prop="two" class="form-item-register">
          <Input v-model="achievement.two" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                 placeholder="业绩二（必填）"></Input>
        </FormItem>
        <FormItem prop="three" class="form-item-register">
          <Input v-model="achievement.three" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                 placeholder="业绩三（必填）"></Input>
        </FormItem>
      </Form>
    </Modal>

    <div style="width: 45%;height: 100%" class="register">
      <div style="text-align: center"><h2>请牢记用户名（组织机构代码）及密码</h2></div>
      <Divider/>
      <Carousel style="height: 100%;"
                v-model="value"
                :autoplay="setting.autoplay"
                :dots="setting.dots"
                :radius-dot="setting.radiusDot"
                :trigger="setting.trigger"
                :arrow="setting.arrow">
        <!--<CarouselItem>-->
        <!--<div class="carousel-item1" @click="next(1)">-->
        <!--<Button type="primary" style="padding: 2em 3.5em;font-size: 0.5em">开始注册</Button>-->
        <!--</div>-->
        <!--</CarouselItem>-->
        <CarouselItem>
          <div class="carousel-item2">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
              <FormItem prop="companyName" class="" label="企业名称">
                <Input v-model="formValidate.companyName" placeholder="企业名称"></Input>
              </FormItem>
              <FormItem prop="companyEmail" class="" label="企业邮箱">
                <Input v-model="formValidate.companyEmail" placeholder="企业邮箱"></Input>
              </FormItem>
              <FormItem prop="orgCode" class="" label="组织机构代码">
                <Input v-model="formValidate.orgCode" placeholder="组织机构代码"></Input>
              </FormItem>
              <FormItem prop="password" label="密码">
                <Input type="password" v-model="formValidate.password" placeholder="密码"></Input>
              </FormItem>
              <FormItem prop="passwordCheck" class="" label="确认密码">
                <Input type="password" v-model="formValidate.passwordCheck" placeholder="确认密码"></Input>
              </FormItem>
            </Form>
          </div>
          <div class="btn-register">
            <Button type="primary" @click="next(1)" v-if="!isShow" class="">下一步</Button>
            <!--<Button type="success" @click="handleSubmit('formValidate')" v-if="isShow" class="register-btn">提交</Button>-->
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="carousel-item2">
            <Form ref="formValidate1" :model="formValidate" :rules="ruleValidate" label-position="top">
              <FormItem prop="contact" class="form-item-register" label="联系人">
                <Input v-model="formValidate.contact" placeholder="联系人"></Input>
              </FormItem>
              <FormItem prop="contactPhone" class="form-item-register" label="联系人电话">
                <Input v-model="formValidate.contactPhone" placeholder="联系人电话"></Input>
              </FormItem>
              <FormItem prop="smsCode" class="form-item-register" label="验证码">
                <Row>
                  <Col span="12">
                    <Input v-model="formValidate.smsCode" placeholder="验证码" :number="true"
                           :maxlength="4">
                    </Input>
                  </Col>
                  <Col span="11" style="text-align: left;" offset="1">
                    <Button @click="getSmsCode" type="primary" v-if="isShowSendBtn">获取验证码
                    </Button>
                    <Button type="primary" v-if="!isShowSendBtn"> {{countDown}} s</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem prop="companyPhone" class="form-item-register" label="公司电话">
                <Input v-model="formValidate.companyPhone" placeholder="公司电话"></Input>
              </FormItem>
              <FormItem prop="companyAddr" class="form-item-register" label="公司地址">
                <Input v-model="formValidate.companyAddr" placeholder="公司地址"></Input>
              </FormItem>
            </Form>
          </div>
          <div class="btn-register">
            <Button type="primary" @click="next(0)" v-if="!isShow" class="">上一步</Button>
            <Button type="primary" @click="next(2)" v-if="!isShow" class="">下一步</Button>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="carousel-item2">
            <Form style="min-height: 300px">
              <FormItem prop="regAmt" style="text-align: left" class="form-item-register" label="注册资金(万元)">

                <Poptip trigger="focus">
                  <Input v-model="formValidate.regAmt" prefix="logo-yen" placeholder="注册资金(万元)" @on-blur="num()"/>
                  <div slot="content">{{ formatNumber }}</div>
                </Poptip>

              </FormItem>

              <FormItem prop="amount" style="text-align: left;" label="施工能力额度">
                <Select v-model="formValidate.amount" placeholder="请选择">
                  <Option v-for="item in constructionAmtList" :value="item.code" :key="item.code">{{ item.name }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem prop="province" style="text-align: left;" label="业务省份">
                <Select v-model="formValidate.province" placeholder="业务省份">
                  <Option v-for="(value ,key) in provinces" :value="key" :key="key">{{ value }}</Option>
                </Select>
              </FormItem>

              <FormItem prop="qualification" style="text-align: left;" label="请选择资质">
                <Select v-model="formValidate.qualification" placeholder="请选择资质" filterable multiple>
                  <Option v-for="item in qualificationList" :value="item.id" :key="item.id">{{ item.zzName }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem prop="types" style="text-align: left;width: 80%">
                <RadioGroup v-model="formValidate.types" @on-change="typesChange">
                  <Radio :label="key" v-for="(value, key) in userTypes" :key="key">{{value}}</Radio>
                </RadioGroup>
              </FormItem>


              <!--业务类信息的完善，可以在进入系统之后，强制完善，前台注册，只完善基本信息-->
              <!--可以放置后台，强制上传，这样可以防止，恶意攻击上传接口，造成文件服务器文件瞬间堆积-->
              <div class="tender-upload" v-if="false">
                <Upload
                  multiple
                  type="drag"
                  action=""
                  :before-upload="handleUpload" :disabled="file!=''">
                  <div style="padding: 16px">
                    <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                    <p>证件文件 .zip文件</p>
                  </div>
                </Upload>
                <div v-if="uploadStatus!='1'">上传文件: {{ file.name }}
                  <Button type="text" @click="upload" :loading="uploadStatus==='2'">
                    {{ uploadStatusObj[uploadStatus] }}
                  </Button>
                  <Icon type="md-close" style="color: red" size="20" @click="delUpFile"
                        v-if="uploadStatus==3||uploadStatus ==4"/>
                  <!--<Button type="error" @click="delUpFile" v-if="uploadStatus==3||uploadStatus ==4">删除上传</Button>-->
                  <!--<Icon type="md-checkmark" v-if ="uploadStatus=='3'"/>-->
                  <!---->
                </div>
              </div>
              <div>

              </div>
            </Form>

            <div class="btn-register">
              <!--</Button>-->
              <Button type="primary" @click="next(1)" v-if="!isShow" class="">上一步</Button>
              <Button type="success" @click="handleSubmit()" :loading="isLoading" v-if="!isShow" class="register-btn">立即创建</Button>
              <!--<Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>-->
            </div>
          </div>
        </CarouselItem>

      </Carousel>
    </div>
    <!--</div>-->
  </div>

</template>
<script>
  import * as api from "../api/api"
  import * as utils from "../common/utils"

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码！'));
        } else {
          if (this.formValidate.passwordCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('passwordCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码！'));
        } else if (value !== this.formValidate.password) {
          callback(new Error('两次密码不一致!'));
        } else {
          callback();
        }
      };
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码！'));
        } else if (this.formValidate.contactPhone === '') {
          callback(new Error('请输入手机号!'));
        } else {
          callback();
        }
      };
      return {
        isLoading: false,
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
        achievement: {
          one: '',
          two: '',
          three: ''
        },
        uploadStatus: '1',
        isShowSendBtn: true,
        timer: null,
        countDown: 60,
        file: '',
        userTypes: [],
        recordUserTypeS: {},
        recordUserType: {},
        lastCode: null,
        //手动关闭对话框的变量
        loading: true,
        qualificationList: [],
        constructionAmtList: [],
        formValidate: {
          amount: 0,
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
          regAmt: '',
          smsCode: '',
          types: '',
          qualification: [],
          province: '',
          achievement: {},
          subTyp: '',
          typ: ''
        },
        provinces: {},
        modal1: false,
        modalAchievement: false,
        typeModel2Tile: '',
        oldTypes: [],
        initRow: 4,
        ruleValidate: {
          companyName: [
            {required: true, message: '企业名称不能为空！', trigger: 'blur'}
          ],
          companyEmail: [
            {required: true, message: '邮箱不能为空！', trigger: 'blur'},
            {type: 'email', message: '邮箱格式错误！', trigger: 'blur'}
          ],
          orgCode: [
            {required: true, message: '机构代码不能为空！', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          passwordCheck: [
            {required: true, validator: validatePassCheck, trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请填写联系人！', trigger: 'blur'}
          ],
          contactPhone: [
            {required: true, message: '请填写联系人电话！', trigger: 'blur'}
          ],
          companyPhone: [
            {required: true, message: '请填写公司电话！', trigger: 'blur'}
          ],
          companyAddr: [
            {required: true, message: '公司地址不能为空！', trigger: 'blur'}
          ],
          businessType: [
            {required: true, type: 'array', min: 1, message: '业务类型不能为空！', trigger: 'change'}
          ],
          regAmt: [
            {required: true, message: '注册资金不能为空！', trigger: 'blur'}
          ],
          smsCode: [
            {required: true, validator: validateCode, trigger: 'blur'}
          ],

        },
        ruleValidate2: {
          one: [
            {required: true, message: '业绩一不能为空！', trigger: 'blur'}
          ],
          two: [
            {required: true, message: '业绩二不能为空！', trigger: 'blur'}
          ],
          three: [
            {required: true, message: '业绩三不能为空！', trigger: 'blur'}
          ],
        },
        current: 0,
        isShow: false,
        stepText: "下一步",

        value: 0,
        setting: {
          autoplay: false, // 自动切换
          autoplaySpeed: 2000,
          dots: 'inside', //指示器位置
          radiusDot: false, //圆形
          trigger: 'click', // 指示器触发方式
          arrow: 'never' // 箭头 hover（悬停），always（一直显示），never（不显示）
        },
      }
    },
    methods: {
      handleSubmit() {
        this.$refs["formValidate"].validate((valid) => {
          if (valid) {
            this.$refs["formValidate1"].validate((valid) => {
              if (valid) {
                let type = this.formValidate.types;
                //格式化类型业绩
                let obj = this.recordUserTypeS[type]
                if (type.indexOf("cl") < 0) {
                  this.subTyp1 = [];
                }
                if (type.indexOf("lw") < 0) {
                  this.subTyp2 = [];
                }
                if (type.indexOf("mm") < 0) {
                  this.subTyp3 = [];
                }
                let subTyp = [];
                //待优化
                subTyp = this.subTyp1.concat(this.subTyp2).concat(this.subTyp3);

                this.formValidate.subTyp = subTyp.toString();
                this.formValidate.typ = type;
                //格式化资质类型为1，2,3
                this.formValidate.qualification = this.formValidate.qualification.join(",");
                //设置业绩
                this.formValidate.achievement = obj;
                //amount转化为数字
                this.isLoading = true;
                this.$http.post(api.REGISTER, this.formValidate).then(res => {
                  if (res.data.data == "ok") {
                    this.$Modal.success({
                      title:"注册成功，请查看您的电子邮件，并及时激活！",
                      okText:'确认',
                    });
                  } else {
                    this.isLoading = false;
                    this.$Message.error('注册失败!');
                  }
                })
              } else {
                this.$Message.error('请填写必填选项!');
              }
            })
          } else {
            this.$Message.error('请填写必填选项!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();

      },
      next(v) {
        this.value = v;
      },
      onOk() {
        this.modal1 = true;
      },
      ok() {
        this.$router.push({
          path: "/login"
        })
      },
      handleUpload(file) {
        this.file = file;
        this.uploadStatus = '5';
        return false;
      },
      delUpFile() {
        this.file = null;
        this.tender.files = null;
        this.uploadStatus = '1';
      },
      getSmsCode() {
        let contactPhone = this.formValidate.contactPhone;
        if (!contactPhone) {
          utils.message({status: 201, msg: '手机号不能为空！'});
          return;
        }
        this.$http.get(api.REGISTER_SMS_CODE + contactPhone).then(res => {
          let data1 = res.data;
          utils.message(data1);
          if (data1.status === 200) {
            this.countDownSmsCode();
          }
        });
      },
      countDownSmsCode() {
        if (!this.timer) {
          let TIME_COUNT = 60;
          this.countDown = TIME_COUNT;
          this.isShowSendBtn = false;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= TIME_COUNT) {
              this.countDown--;
            } else {
              this.isShowSendBtn = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      upload() {
        this.uploadStatus = '2';
        let formData = new FormData();
        formData.append("file", this.file);
        this.$http.post(api.MENROLL_UPLOAD, formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.formInline.files = res.data.data;
            this.uploadStatus = '3'
          } else {
            this.uploadStatus = '4'
          }
          // this.$Message.success('Success')
        }).catch((error) => {
          this.uploadStatus = '4'
        });
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
            utils.saveData("userType", data);
            utils.saveData("constructionAmtType", this.constructionAmtList);
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
          //{id， name}
          this.qualificationList = res.data.data
          utils.saveData("qualificationType", this.qualificationList);
        });
      },
      typesChange(arr) {
        // let length = arr.length;
        // let oldLength = this.oldTypes.length
        // if (length == 0 && oldLength == 0) {
        //   return;
        // }
        // if (oldLength < length) {
        this.modalAchievement = true;
        //recordUserTypeS{1:{业绩1：''，业绩2：''，业绩3：''},....}
        //arr为新增时 。需要弹出对话框，设置业绩
        //数组中新增的code
        // this.lastCode = arr[length - 1];
        this.lastCode = arr;
        //小类
        let lx = this.lastCode;
        if (lx.indexOf("cl") >= 0) {
          this.isCl = true;
        } else {
          this.isCl = false;
          // this.checksubbox1 = [];
        }
        if (lx.indexOf("lw") >= 0) {
          this.isLw = true;
        } else {
          this.isLw = false;
          // this.checksubbox2 = [];
        }
        if (lx.indexOf("mm") >= 0) {
          this.isMm = true;
        } else {
          this.isMm = false;
          // this.checksubbox3 = [];
        }
        this.checksubbox1 = [];
        this.checksubbox2 = [];
        this.checksubbox3 = [];
        // this.subTyp1 = this.checksubbox1;
        // this.subTyp2 = this.checksubbox2;
        // this.subTyp3 = this.checksubbox3;


        if (this.recordUserTypeS[this.lastCode]) {
          this.recordUserType = this.recordUserTypeS[this.lastCode];
          //填充数据
          this.achievement.one = this.recordUserType["achievementOne"];
          this.achievement.two = this.recordUserType["achievementTwo"];
          this.achievement.three = this.recordUserType["achievementThree"];
        }
        this.initRow = 4;
        //设置对话框头部
        let userType = this.userTypes[this.lastCode];
        this.typeModel2Tile = "请输入" + userType + "类型业绩";

        // } else {
        //   //减少时
        // }
        // this.oldTypes = arr;
      },
      cancel() {
        this.formValidate.types = "";
      },
      ok2(name) {
        //类型对话框 ok
        // let achievementOne = this.achievementOne.replace(/\n/g, '<br/>').replace(/ /g, "&nbsp;");
        // let achievementTwo = this.achievementTwo.replace(/\n/g, '<br/>').replace(/ /g, "&nbsp;");
        // let achievementThree = this.achievementThree.replace(/\n/g, '<br/>').replace(/ /g, "&nbsp;");
        if (this.lastCode == "cl" && this.checksubbox1.length < 1) {
          this.$Message.error('请勾选材料对应类型分类!');
          return;
        }
        if (this.lastCode == "lw" && this.checksubbox2.length < 1) {
          this.$Message.error('请勾选劳务对应类型分类!');
          return;
        }
        if (this.lastCode == "mm" && this.checksubbox3.length < 1) {
          this.$Message.error('请勾选苗木对应类型分类!');
          return;
        }

        this.$refs[name].validate((valid) => {
          if (valid) {
            let achievementOne = this.achievement.one;
            let achievementTwo = this.achievement.two;
            let achievementThree = this.achievement.three;
            this.recordUserTypeS[this.lastCode] = {
              "achievementOne": achievementOne,
              "achievementTwo": achievementTwo,
              "achievementThree": achievementThree,
            };
            this.$refs[name].resetFields();
            this.modalAchievement = false;

          }
        })
      },
      num(){
          let amt=this.formValidate.regAmt;
          let patrn = /^[0-9]*$/;
          if(amt!=null && amt!="" && amt!=undefined){
            if (!patrn.test(amt)) {
              this.$Modal.error({
                title: "必须填写数字！",
                okText: '确认',
              });
            }
          }
      }
    },
    computed: {
      formatNumber() {
        if (this.formValidate.regAmt === '') return '请确认金额';
        return utils.numFormat(this.formValidate.regAmt);
      },
    },
    // watch: {
    //   formValidate:{
    //     handler(val, oldVal){
    //       if(val.smsCode > 4){
    //         // this.formValidate.smsCode = oldVal.smsCode
    //         this.$set(this.formValidate, 'smsCode',  oldVal.smsCode);
    //
    //       }
    //     },
    //     deep:true
    //   }
    // },
    created() {
      let data1 = utils.getData("userType");
      let data2 = utils.getData("qualificationType");
      let data3 = utils.getData("constructionAmtType");

      if (!data1 || !data3) {
        this.getTypeDictInfo();
      } else {
        this.userTypes = data1;
        this.constructionAmtList = data3;
      }
      if (!data2) {
        this.getQualificationType();
      } else {
        this.qualificationList = data2;
      }
      ;
      this.getSubType();//业务类型子类
      this.provinces = this.$store.state.provinces;
    }
  }
</script>
<style>
  .register-bg {
    width: 100%;
    height: 100%;
    background: url('../assets/images/bg.svg') no-repeat;
    background-size: cover;
    background-position: center;
    padding-top: 50px;
    padding-bottom: 30px;
    background-color: #f1f1f1;
  }

  .register {
    padding: 3em 3em;
    margin: 0px auto;
    /*max-width: 50%;*/
    /*text-align: center;*/
    background-color: #ffffff;
  }

  .form-item-register {
    /*margin-top: 30px;*/
  }

  .carousel-item1 {
    /*width: 50%;*/
    height: 500px;
    line-height: 450px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
  }

  .carousel-item2 {
    padding: 0px 30px 0px 30px;
    /*margin-right: 30px;*/
    min-height: 400px;
  }

  .btn-register {
    margin-top: 10px;
    text-align: center;
  }

  .form-file {
    margin-top: 100px;
  }

  .modal-register {
    font-size: 1.2em;
    font-weight: bold;
  }

  .input-number-len {
    width: 100%;
  }

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ivu-modal {
    top: 0;
  }

  .ivu-poptip {
    width: 100%;
  }

  .ivu-poptip-rel {
    width: 100%;
  }
  div.ivu-carousel > ul{
    display: none;
  }
</style>
