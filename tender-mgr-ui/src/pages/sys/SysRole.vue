<template>
  <div class="sysrole-bg">
    <Modal v-model="modal12" draggable scrollable title="配置资源" @on-ok="confOk()">
      <Tree :data="data1" ref="tree1" show-checkbox></Tree>
    </Modal>
    <Card class="sysrole">
      <Row>
        <Col span="4">
          <Button type="info">新增</Button>
          <Button type="error">删除</Button>
        </Col>
      </Row>
      <Row class="sysrole-content">
        <Col span="5">
          <Card dis-hover>
            <Tree :data="data2" ref="tree" show-checkbox @on-select-change="onSelectChange()"></Tree>
          </Card>

        </Col>
        <Col span="17" offset="1">
          <Card>
            <Form :model="formItem" :label-width="80">
              <FormItem label="父级角色" v-if="!editFlag">
                <Select v-model="formItem.parentId">
                  <Option v-for="(item,index) in parentRoleList" :key="item.id" :value="item.id">{{ item.name }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="父级角色" v-if="editFlag">
                <Select v-model="formItem.parentId" disabled>
                  <Option v-for="(item,index) in parentRoleList" :key="item.id" :value="item.id">{{ item.name }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="名称">
                <Input v-model="formItem.name" placeholder="角色名称"></Input>
              </FormItem>
              <FormItem label="是否显示">
                <RadioGroup v-model="formItem.isShow">
                  <Radio label="1">显示</Radio>
                  <Radio label="0">不显示</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="顺序">
                <Slider v-model="formItem.sort"></Slider>
              </FormItem>
            </Form>
            <Button type="info" v-if="editFlag">修改</Button>
            <Button type="success" v-if="addFlag">新增</Button>
            <Button type="success" v-if="confFlag" @click="conf">
              <Icon type="md-settings" size="20"/>
              配置资源
            </Button>
            <Button type="error" v-if="editFlag">删除</Button>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
  import * as api from '../../api/api'
  import * as Message from '../../common/utils';
  export default {
    data() {
      return {
        parentRoleList: [],
        formItem: {
          name: '',
          sort: 0,
          isShow: '',
          parentId: ''
        },
        //role tree数据
        data2: [],
        //menu tree数据
        data1:[],
        addFlag: true,
        editFlag: false,
        confFlag: false,
        modal12: false,
        roleId:''
      }
    },
    methods: {
      onSelectChange() {
        let selectedNodes = this.$refs.tree.getSelectedNodes();
        if (selectedNodes.length == 0) {
          return;
        }
        let selectedNode = selectedNodes[0];
        let id = selectedNode.id;
        this.$http.get(api.SYS_ROLE_ID + "/" + id).then(res => {
          let result = res.data.data;
          this.formItem.name = result.name;
          this.formItem.isShow = String(result.isShow);
          this.formItem.sort = result.sort;
          this.formItem.parentId = result.parentId;
        })
        this.addFlag = false;
        this.editFlag = true;
        this.confFlag = true;
        this.roleId = id;
      },
      conf() {
        //配置资源
        this.modal12 = true;
        this.getTreeMenu();
      },
      getTreeMenu() {
        //获取树菜单
        this.$http.get(api.SYS_ROLE_GETMENUS + "/" + this.roleId).then(res => {
          this.data1 = res.data.data;
        })
      },
      confOk() {
        let checkedNodes = this.$refs.tree1.getCheckedAndIndeterminateNodes();
        console.log(checkedNodes)
        let length = checkedNodes.length;
        let params = {roleId:this.roleId , roleMenus:[]};
        if (length !== 0) {
          for (let i = 0; i <length; i++) {
            let checkedNode = checkedNodes[i];
            params.roleMenus.push({
              roleId: this.roleId,
              menuId: checkedNode.id
            });
          }
        }
        this.$http.post(api.SYS_ROLE_MENU , params).then(res => {
          Message.message(res.data);
        });

      }

    },
    created() {
      //获取树菜单
      this.$http.get(api.SYS_ROLE_TREE).then(res => {
        this.data2 = res.data.data;
      });
      //获取菜单列表
      this.$http.get(api.SYS_ROLE_SELECT).then(res => {
        this.parentRoleList = res.data.data;
        console.log(this.parentRoleList)
      });
    }

  }
</script>
<style>
  .sysrole-bg {
    padding: 16px;
  }

  .sysrole {
    padding-top: 16px;
  }

  .sysrole-content {
    margin-top: 16px;
  }

  .sysrole-item {
    /*border: 1px solid #dcdee2;*/
    padding: 10px;
  }

  .sysrole-right {
    padding: 10px;
  }

  /*tree Css*/
  .ivu-checkbox + span, .ivu-checkbox-wrapper + span {
    font-size: 1.3em;
  }
</style>
