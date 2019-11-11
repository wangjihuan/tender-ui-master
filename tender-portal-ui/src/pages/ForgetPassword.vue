<template>
  <div class="forget-bg">
    <div style="width: 35%;height: 100%" class="forget">
      <div style="text-align: center"><h2>通过手机号重置密码</h2></div>
      <Divider/>
      <Form :model="formValidate" label-position="top" ref="formValidate" :rules="ruleValidate">
        <FormItem label="组织机构代码" prop="orgCode">
          <Input v-model="formValidate.orgCode"></Input>
        </FormItem>
        <FormItem prop="smsCode" label="获取验证码">
          <Row>
            <Col span="12">
              <Input v-model="formValidate.smsCode" placeholder="验证码" :number="true"
                     :maxlength="4"></Input>
            </Col>
            <Col span="11" style="text-align: left;" offset="1">
              <Button @click="getSmsCode" type="primary" v-if="isShowSendBtn">获取验证码</Button>
              <Button type="primary" v-if="!isShowSendBtn"> {{countDown}} s</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" type="password" placeholder="密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwordCheck">
          <Input type="password" v-model="formValidate.passwordCheck" placeholder="确认密码"></Input>
        </FormItem>
      </Form>
      <div style="padding-top: 2em">
        <Button type="primary" style="width: 100%;padding: 0.5em 0" @click="submit">提交</Button>
      </div>
    </div>
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
        countDown: 60,
        isShowSendBtn: true,
        isCanSendSms: true,
        formValidate: {
          orgCode: '',
          smsCode: '',
          password: '',
          passwordCheck: ''
        },
        ruleValidate: {
          orgCode: [
            {required: true, message: '机构代码不能为空！', trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          passwordCheck: [
            {required: true, validator: validatePassCheck, trigger: 'blur'}
          ],
          smsCode: [
            {required: true, validator: validateCode, trigger: 'blur'}
          ],

        },

      }
    },
    methods: {
      getSmsCode() {
        if (!this.isCanSendSms) {
          return;
        }
        let orgCode = this.formValidate.orgCode;
        if (!orgCode) {
          utils.message({status: 201, msg: '组织机构代码不能为空！'});
          return;
        }
        utils.isCanDisabledByTimer(this.isCanSendSms);
        this.$http.get(api.FORGET_SMS_CODE + orgCode).then(res => {
          let data1 = res.data;
          utils.message(data1);
          if (data1.status === 200) {
            this.$Modal.success({
              title: "短信验证",
              content: "已发送至手机号为" + data1.data + "的手机"
            });
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

      submit() {

        this.$http.post(api.FORGET_SUBMIT, this.formValidate).then(res => {
          let data1 = res.data;
          utils.message(data1);
          if (data1.status === 200) {
            this.$router.go(-1)
          }
        });
      }
    }
  }
</script>
<style>
  .forget-bg {
    width: 100%;
    height: 100%;
    background: url('../assets/images/bg.svg') no-repeat;
    background-size: cover;
    background-position: center;
    padding-top: 2em;
    padding-bottom: 30px;
    background-color: #f1f1f1;
  }

  .forget {
    padding: 3em 6em;
    margin: 0px auto;
    /*max-width: 50%;*/
    /*text-align: center;*/
    background-color: #ffffff;
  }

  .form-item-forget {
    margin-top: 30px;
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
    padding: 10px 30px 0px 30px;
    /*margin-right: 30px;*/
    min-height: 400px;
  }

  .btn-forget {
    margin-top: 10px;
  }

  .form-file {
    margin-top: 100px;
  }

  .modal-forget {
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
</style>
