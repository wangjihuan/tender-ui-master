<template>
  <Layout>
    <Header :style="{width: '100%'}" class="layout-head">
      <Menu mode="horizontal" :theme="theme1" active-name="supplier-list" @on-select="clickItem">
        <i-row>
          <i-col span="7" offset="1"><h1 class="head-title">东方园林招投标后台管理系统</h1></i-col>
          <i-col span="12" offset="4">
            <div class="layout-nav">
              <MenuItem name="blog" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                投标
              </MenuItem>
              <MenuItem name="supplier-list" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                供应商
              </MenuItem>
              <MenuItem name="time-line" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                标书历史
              </MenuItem>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-stats"/>
                  页面汇总
                </template>
                <MenuGroup title="测试页面">
                  <MenuItem name="register">注册</MenuItem>
                  <MenuItem name="supplier">用户信息</MenuItem>
                  <MenuItem name="supplier-edit">用户编辑</MenuItem>
                  <MenuItem name="resetPwd">重置密码</MenuItem>
                  <MenuItem name="tender-list">招标列表</MenuItem>
                  <MenuItem name="tender-card">招标详情</MenuItem>
                  <MenuItem name="notify-list">中标公告</MenuItem>
                  <MenuItem name="notify-card">中标公告详情</MenuItem>
                </MenuGroup>
                <!--<MenuGroup title="留存">-->
                <!--<MenuItem name="3-4">用户留存</MenuItem>-->
                <!--<MenuItem name="3-5">流失用户</MenuItem>-->
                <!--</MenuGroup>-->
              </Submenu>
              <MenuItem name="logout" class="menu-font">
                <Icon type="ios-navigate" size="18"></Icon>
                注销
              </MenuItem>
            </div>
          </i-col>
        </i-row>
      </Menu>
    </Header>
    <Layout :style="{minHeight: '550px'}">
      <Row>
        <!--<Col span="16" offset="1">-->
        <!--</Col>-->
        <router-view/>
        <!--<Col span="6">-->
        <!--<blogside></blogside>-->
        <!--</Col>-->
      </Row>

    </Layout>

    <Footer class="layout-footer-center">2011-2018 &copy; TalkingData</Footer>
  </Layout>
</template>
<script>
  export default {
    data() {
      return {
        // light、dark、primary
        theme1: 'dark'
      }
    },
    methods: {
      clickItem(name) {
        // alert(name)
        this.$router.push({
          path: "/" + name
        })
      }
    },
    components: {
      // blogside
    }
  }
</script>

<style>
  /*.layout-nav {*/
  /*text-align: right;*/
  /*}*/

  .layout-footer-center {
    text-align: center;
  }

  .head-title {
    /*color: #f5f7f9;*/
  }

</style>

