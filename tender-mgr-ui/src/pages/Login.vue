<template>
  <div>
  <div class="block">
    <span class="demonstration">默认不区分颜色</span>
    <el-rate v-model="value1"></el-rate>
  </div>
  <div class="block">
    <span class="demonstration">区分颜色</span>
    <el-rate
      v-model="value2"
      :colors="colors">
    </el-rate>
  </div>

  <div class="login">

    <div class="logo"></div>
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <h2 slot="title" style="text-align: center">
          招投标管理系统
        </h2>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入用户名">
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
              <Button @click="handleSubmit" type="primary" long :loading="isLoading">登录</Button>
            </FormItem>
          </Form>
          <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
          <!--<p><a>忘记密码？</a></p>-->
        </div>
      </Card>
    </div>

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
        value1: null,
        value2: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],// 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900'
        isLoading: false,
        form: {
          username: '',
          password: '123456'
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
        // this.$http.post(api.LOGIN, {headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'} ,
        this.$http.post(api.AUTH, form, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        }).then(res => {
          this.isLoading = false;
          utils.message(res.data);
          if (res.data.status === 200) {
            //初始化字典
            this.initDictData();
            //保存权限列表
            auth.savePermission(res.data.authorities);
            auth.saveUserid(res.data.data.username);
            auth.saveUsername(res.data.data.tag.empname);

            this.$router.push({
              path: "/awit-task"
            });
          }
        }).then(err =>{
          this.isLoading = false;
        });
      },

      initDictData() {
        //TODO 合并请求 ，初始化字典 存储在本地store中,
        this.getTenderDictInfo();
        this.getEnrollDictInfo();
        this.getTypeDictInfo();
      },
      getTenderDictInfo() {
        this.$http.get(api.COMMON_DICT_TYPE + "tender_status").then(res => {
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
        this.$http.get(api.COMMON_DICT_TYPE + "user_tender_status").then(res => {
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
        this.$http.get(api.COMMON_DICT_TYPE + "user_type").then(res => {
            let dictData = res.data.data;
            let data = {};
            dictData.forEach((o) => {
              data[o.code] = o.name;
            });
            utils.saveData("userType", data);
          }
        )
      },
    }
  }
</script>
<style>
  .login {
    width: 100%;
    height: 100%;
    background: url('../assets/images/login-bg2.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .login-con {
    position: absolute;
    /*right: 160px;*/
    /*right: 50%;*/
    top: 50%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(-60%);
    width: 350px;
    opacity: 0.93;
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

</style>
