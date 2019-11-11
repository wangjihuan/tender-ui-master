<template>
  <div>

    <Menu mode="horizontal" :theme="theme1" @on-select="clickItem">
      <Row>
        <Col span="4">
          <a href="javascript:void(0);" @click="change" target="_blank"><p class="big-title">招投标管理系统</p></a>
        </Col>
        <Col span="4" offset="16">
          <Submenu name="4">
            <template slot="title">
              <Avatar style="background-color: #87d068;" icon="ios-person"/>
              {{username}}
            </template>
            <MenuGroup title="安全">
              <MenuItem name="logout">注销</MenuItem>
            </MenuGroup>
          </Submenu>

        </Col>
      </Row>

    </Menu>
    <Row>
      <Col span="4" v-if="show==true">
        <Menu :theme="theme1" :active-name="activeName" ref="activeName" @on-select="clickItem" :open-names=openMenus>
          <MenuItem :name="menu.url" v-if="!menu.children" v-for="(menu , index) in menus" :key="menu.id">
            <!--<Icon type="md-chatbubbles"/>-->
            <i :class="menu.icon" style="font-size: 16px;color:#2d8cf0"></i>
            {{menu.title}}
          </MenuItem>
          <template v-else>
            <Submenu :name="menu.url">
              <template slot="title">
                <!--<Icon type="md-chatbubbles"/>-->
                <i :class="menu.icon" style="font-size: 16px;color:#2d8cf0"></i>
                {{menu.title}}
              </template>
              <template>
                <MenuItem :name="item.url" v-for="(item , index) in menu.children" :key="item.id">
                  <i :class="item.icon" style="font-size: 16px;color:#2d8cf0"></i>
                  {{item.title}}
                </MenuItem>
              </template>
            </Submenu>
          </template>
        </Menu>
      </Col>
      <Col span="20" class="content" v-if="show==true">
        <div style="padding: 1em 1em 0 2em" v-if="breadcrumbs.length>0">
          <Breadcrumb>
            <BreadcrumbItem v-for="item in breadcrumbs" :key="item.id">
              {{item.name}}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <router-view/>
      </Col>
      <Col span="24" class="content" v-if="show==false">
        <router-view/>
      </Col>

    </Row>
  </div>
</template>
<script>
  import * as api from '../api/api'
  import auth from "../common/auth";
  import * as Message from '../common/utils'

  export default {
    data() {
      return {
        // light、dark、primary
        theme1: 'primary',
        menus: [],
        activeName: '',
        username: '',
        show: true,
        i: 0,
        openMenus: [],
        breadcrumbs: [],
        breadcrumbAll: {},
        breadcrumbVar: []
      }
    },
    methods: {
      clickItem(name) {
        if (name === "logout") {
          this.toLogout();
          return;
        }
        this.breadcrumbs = this.breadcrumbAll[name];
        this.$router.push({
          path: name
        })
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
      change() {
        if (this.i % 2 == 0) {
          this.show = false;
        } else {
          this.show = true;
        }
        this.i++;
      },
      createBreadcrumbs(children) {
        //递归数据结构{path:[{name:'', id:''},{name:'', id:''}]}
        if (children && children.length !== 0) {
          for (let j = 0; j < children.length; j++) {
            // debugger
            let child = children[j];
            if (child.parentId === -1) {
              this.breadcrumbVar = [];
            }
            let children1 = child.children;

            if (children1 == null) {
              let breadcrumbVar1 = Message.clone(this.breadcrumbVar);
              breadcrumbVar1.push({
                name: child.title,
                id: child.id
              });
              this.breadcrumbAll[child.url] = breadcrumbVar1;
            } else {
              this.breadcrumbVar.push({
                name: child.title,
                id: child.id
              });
              this.createBreadcrumbs(children1);
            }
          }
        }
      },


    },
    mounted() {
      // this.currentActiveName = this.$route.path;
    },
    created() {
      let userid = auth.getUserid();
      this.username = userid;
      this.$http.get(api.MAIN_MENUS + "?userid=" + userid).then(res => {
        let data1 = res.data.data;
        if (data1 || data1.length !== 0) {
          this.menus = res.data.data;
          let that = this;
          this.activeName = this.$route.path;
          this.$nextTick(() => {
            debugger
            this.$refs.activeName.updateActiveName();
            this.$refs.activeName.updateOpened();
          });
          this.createBreadcrumbs(this.menus);
          that.breadcrumbs = that.breadcrumbAll[this.$route.path];
        }
      });
    },
    components: {
      // blogside
    }
  }
</script>
<style>
  .content {
    /*padding-top: 20px;*/
  }

  /*招标管理系统的css样式*/
  .ivu-menu-vertical .ivu-menu-item-group-title {
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

  .big-title {
    /*padding: 20px;*/
    padding-left: 20px;
    font-size: 20px;
    color: white;
    font-weight: bold;
  }

  .ivu-menu-submenu-title span > i, .ivu-menu-submenu-title > i {
    margin-right: 0px;
  }

</style>
