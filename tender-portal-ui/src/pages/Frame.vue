<template>
  <Layout>
    <Modal v-model="model1" title="请您尽快完善企业证件信息" :closable="false" :mask-closable="false"
           :loading="true" width="50%">
      <h4 style="padding-top: 1em;font-size: 14px">请尽可能多的上传以下证照信息，用于我司审核供应商资质。
        若上传虚假资料、或资料缺失，可能审核不通过，无法参与我司招投标业务，请认真检查后再上传。
        请将所有需上传的文件打成一个压缩包后再上传，建议上传的证照信息如下：<br>
        <span style="color: red">营业执照、开户许可证、企业资质证书（施工企业）、企业许可证书（安全、开矿、特种）、劳务分包单位人员及机械一览表、劳务分包主要业绩一览表、联系人授权委托书、联系人社保证明（股权证明）</span>等相关文件。</h4>
      <!--<h4>2.上传文件格式：上传后缀为 <span style="color: red">.zip</span>结尾的文件</h4>-->
      <br>
      <div class="tender-upload" v-if="true">
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
        <div v-if="uploadStatus!='1'">
          <div style="padding: 0.5em; border:1px solid #eeeeee;">
            <span style="font-weight: bold;font-size: 1.2em;"> 上传文件: </span><span style="font-size: 1.2em"> {{ file.name }}</span>
            <Button type="primary" @click="upload" :loading="uploadStatus==='2'" style="margin-left: 1em">
              {{ uploadStatusObj[uploadStatus] }}
            </Button>
            <Icon type="md-close" style="color: red" size="20" @click="delUpFile"
                  v-if="uploadStatus==3||uploadStatus ==4"/>
          </div>


        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok2()" :disabled="isDisabled">完善信息</Button>
      </div>
    </Modal>
    <Header :style="{width: '100%'}" class="layout-head">
      <Menu mode="horizontal" :theme="theme1" :active-name="activeName" ref="activeName" @on-select="clickItem">
        <i-row>
          <i-col span="5"><h2 class="head-title">东方园林招投标系统</h2></i-col>
          <i-col span="19" class="head-title-right">
            <div class="layout-nav">
              <MenuItem name="/tender-list" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                招标信息
              </MenuItem>
              <MenuItem name="/menroll-list" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                我的报名
              </MenuItem>
              <MenuItem name="/answer-list" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                答疑
              </MenuItem>
              <MenuItem name="/mtender-list" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                我的投标
              </MenuItem>
              <MenuItem name="/notify-list" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                中标公告
              </MenuItem>
              <!--<Submenu name="3">-->
              <!--<template slot="title">-->
              <!--<Icon type="ios-stats"/>-->
              <!--页面汇总-->
              <!--</template>-->
              <!--<MenuGroup title="测试页面">-->
              <!--<MenuItem name="register">注册</MenuItem>-->
              <!--<MenuItem name="supplier">用户信息</MenuItem>-->
              <!--<MenuItem name="supplier-edit">用户编辑</MenuItem>-->
              <!--<MenuItem name="resetPwd">重置密码</MenuItem>-->
              <!--<MenuItem name="tender-list">招标列表</MenuItem>-->
              <!--<MenuItem name="tender-card">招标详情</MenuItem>-->
              <!--<MenuItem name="notify-list">中标公告</MenuItem>-->
              <!--<MenuItem name="notify-card">中标公告详情</MenuItem>-->
              <!--</MenuGroup>-->
              <!--<MenuGroup title="留存">-->
              <!--<MenuItem name="3-4">用户留存</MenuItem>-->
              <!--<MenuItem name="3-5">流失用户</MenuItem>-->
              <!--</MenuGroup>-->
              <!--</Submenu>-->
              <MenuItem name="supplier">
              </MenuItem>
              <Submenu name="4">
                <template slot="title">
                  <Avatar style="background-color: #87d068;" icon="ios-person"/>
                  {{companyName}}
                </template>
                <MenuGroup title="基本信息">
                  <MenuItem name="/supplier">用户</MenuItem>
                  <MenuItem name="/supplier-edit">用户编辑</MenuItem>
                </MenuGroup>
                <MenuGroup title="资质信息">
                  <MenuItem name="/supplier-typ-edit">资质编辑</MenuItem>
                </MenuGroup>
                <MenuGroup title="安全">
                  <MenuItem name="/resetPwd">重置密码</MenuItem>
                  <MenuItem name="/logout">注销</MenuItem>
                </MenuGroup>
              </Submenu>

            </div>
          </i-col>
        </i-row>
      </Menu>
    </Header>
    <Layout :style="{minHeight: '550px'}">
      <Row style="width: 99%;">
        <!--<keep-alive>-->
        <!--&lt;!&ndash;防止ajax重复请求&ndash;&gt;-->
        <!--<router-view v-if="$route.meta.keep_alive"></router-view>-->
        <!--</keep-alive>-->
        <!--<router-view v-if="!$route.meta.keep_alive"></router-view>-->
        <!-- TODO 后期添加缓存 配置router中的meta的keep_alive的值 -->
        <Col span="24">
          <router-view/>
        </Col>
      </Row>

    </Layout>


    <Footer class="layout-footer-center">2011-2018 &copy; TalkingData</Footer>
  </Layout>
</template>
<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'
  import auth from '../common/auth'

  export default {
    data() {
      return {
        // light、dark、primary
        theme1: 'dark',
        activeName: '',
        model1: false,
        isDisabled: true,
        file: '',
        uploadStatus: '1',
        //上传状态
        uploadStatusObj: {
          "1": '无文件',
          "2": '正在上传',
          "3": '上传成功',
          "4": '上传失败',
          "5": '确定上传',
        },
        files: '',
        formInline:{
          files: ''
        }
      }
    },
    methods: {
      clickItem(name) {
        // debugger
        if (name === "/logout") {
          this.toLogout();
          return;
        }
        this.$router.push({
          path: name
        });
      },
      toLogout() {
        this.$http.get(api.LOGOUT).then(res => {
          Message.message(res.data);
          if (res.data.status === 200) {
            auth.logout();
            this.$router.push({
              path: "/login"
            })
          }
        });
      },
      //是否已经完善企业证件信息
      getCredentials() {
        this.$http.get(api.USER_CREDENTIALS).then(res => {
          if (res.data.status === 200) {
            this.model1 = res.data.data;
          }
        });
      },
      ok2() {
        //保存完善企业证件信息
        this.$http.post(api.USER_CREDENTIALS_SAVE,{credentials: this.formInline.files}).then(res => {
          Message.message(res.data)
          if (res.data.status === 200) {
            this.model1 = false;
          }
        });

      },
      upload() {
        this.uploadStatus = '2';
        let formData = new FormData();
        formData.append("file", this.file);
        this.$http.post(api.USER_CREDENTIALS_UPLOAD, formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.formInline.files = res.data.data;
            this.uploadStatus = '3'
            this.isDisabled = false;
          } else {
            this.uploadStatus = '4'
            Message.message(res.data);
          }
          // this.$Message.success('Success')
        }).catch((error) => {
          this.uploadStatus = '4'
        });
      },
      handleUpload(file) {
        this.file = file;
        this.uploadStatus = '5';
        return false;
      },
      delUpFile() {
        this.isDisabled = true;
        this.file = '';
        this.formInline.files = null;
        this.uploadStatus = '1';
      },
    },
    components: {
      // blogside
    },
    created() {
      this.getCredentials();
      this.companyName = auth.getCompanyName();
      this.activeName = this.$route.path;
      this.$nextTick(() => {
        this.$refs.activeName.updateActiveName();
      })

    },

  }
</script>

<style>
  .menu-font {
    font-size: 1.2em
  }

  .layout-footer-center {
    text-align: center;
  }

  .head-title {
    color: #f5f7f9;
  }

  .layout-nav {
    float: right;
  }

  /*对话框垂直居中*/
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vertical-center-modal .ivu-modal {
    top: 0;
  }

  .ivu-menu-submenu-title span > i, .ivu-menu-submenu-title > i {
    margin-right: 0px;
  }
</style>

