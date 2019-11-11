<template>
  <div class="login">
    <div class="logo"></div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登陆" :bordered="false">
        <!--<h2 slot="title">欢迎登陆</h2>-->
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入组织机构代码">
              <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" :loading="isLoading" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">
            <a @click="forgetPassword" style="margin-right: 1em">忘记密码? </a>
          </p>
          <p class="login-tip">
            尚未拥有账户？ <a @click="handleRegister">注册</a>
          </p>
        </div>
      </Card>
    </div>

  </div>
</template>
<script>
  import * as api from '../api/api'
  import * as utils from '../common/utils';
  import auth from '../common/auth';

  export default {
    data() {
      return {
        isLoading: false,
        form: {
          userName: 'super_admin',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码最少6位', trigger: 'blur'}
          ]
        }

      }
    },

    methods: {
      handleSubmit() {
        this.isLoading = true;

        let form = new FormData();
        form.append("username", this.form.username);
        form.append("password", this.form.password);
        //axios请求
        this.$http.post(api.AUTH, form, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        }).then(res => {
          utils.message(res.data);
          if (res.data.status === 200) {
            //初始化字典
            this.initDictData();
            //保存权限列表
            // auth.savePermission(res.data.authorities);
            //保存userInfo
            auth.saveCompanyName(res.data.data.tag.companyName);
            //防止并发登陆问题
            auth.saveUserid(res.data.data.username);
            this.$router.push({
              path: "/tender-list"
            });
          } else {
            this.isLoading = false;
            //业务异常信息
            // utils.message(res.data);
          }

        });

      },
      handleRegister() {
        this.$router.push({
          path: "/register"
        })
      },
      forgetPassword() {
        //忘记密码
        this.$router.push({
          path: "/forget-password"
        });

      },
      initDictData() {
        //TODO 合并请求 ，初始化字典 存储在本地store中,
        this.getTenderDictInfo();
        this.getEnrollDictInfo();
        this.getTypeDictInfo();
      },
      getTenderDictInfo() {
        this.$http.get(api.TENDER_DICT_STATUS + "tender_status").then(res => {
            let dictData = res.data.data;
            let data = {};
            dictData.forEach((o) => {
              data[o.code] = o.name;
            });
            utils.saveData("tenderStatus", data);

          }
        );
      },
      getEnrollDictInfo() {
        this.$http.get(api.TENDER_DICT_STATUS + "user_tender_status").then(res => {
            let dictData = res.data.data;
            let data = {};
            dictData.forEach((o) => {
              data[o.code] = o.name;
            });
            utils.saveData("userTenderStatus", data);
          }
        )
      },
      getTypeDictInfo() {
        this.$http.get(api.LOGIN_DICT_TYPE + "user_type").then(res => {
            let dictData = res.data.data;
            let data = {};
            dictData.forEach((o) => {
              data[o.code] = o.name;
            });
            utils.saveData("userType", data);
          }
        )
      },
    },
    created() {
      //初始化type
    }
  }
</script>
<style>
  .login {
    width: 100%;
    height: 100%;
    background: url('../assets/images/login_bg.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }

  .logo {
    background: url("../assets/logo1.png") no-repeat;
    position: absolute;
    left: 100px;
    top: 13%;
    transform: translateY(-60%);
    width: 200px;
    height: 100px;
  }

  .login-tip {
    text-align: center;
  }

</style>
