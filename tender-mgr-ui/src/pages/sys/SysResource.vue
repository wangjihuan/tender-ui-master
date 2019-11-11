<template>
  <div class="sysresource-bg">
    <Card class="sysresource">
      <Row>
        <Col span="4">
          <Button type="info" @click="toAdd('formItem')">新增</Button>
          <!--<Button type="error">删除</Button>-->
        </Col>
      </Row>
      <Row class="sysresource-content">
        <Col span="5">
          <Card dis-hover>
            <Tree :data="data2" ref="tree" show-checkbox @on-select-change="onSelectChange()"></Tree>
          </Card>

        </Col>
        <Col span="17" offset="1">
          <Card>
            <Form ref="formItem" :model="formItem" :label-width="80" >
              <FormItem label="父级菜单"  prop="parentId">
                <Select v-model="formItem.parentId" :disabled="editFlag">
                  <Option v-for="(item,index) in parentResourceList" v-bind:key="item.id" :value="item.id">{{ item.name }}
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="名称" prop="name">
                <Input v-model="formItem.name" placeholder="资源名称"></Input>
              </FormItem>
              <FormItem label="id" prop="id" v-show="false">
                <Input v-model="formItem.id" placeholder="id"></Input>
              </FormItem>
              <FormItem label="链接" prop="href">
                <Input v-model="formItem.href" placeholder="url链接"></Input>
              </FormItem>
              <FormItem label="类型" prop="type">
                <RadioGroup v-model="formItem.type" :redonly="true">
                  <Radio label="3">功能</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="是否显示" prop="isShow">
                <RadioGroup v-model="formItem.isShow" :redonly="true">
                  <Radio label="1">显示</Radio>
                  <Radio label="0">不显示</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="顺序" prop="sort">
                <Slider v-model="formItem.sort"></Slider>
              </FormItem>
            </Form>
            <Button type="info" v-if="editFlag" @click="edit">修改</Button>
            <Button type="success" v-if="addFlag" @click="add">保存</Button>
            <Button type="error" v-if="editFlag" @click="del">删除</Button>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
  import * as api from '../../api/api'
  import * as Message from '../../common/utils'

  export default {
    data() {
      return {
        parentResourceList: [],
        formItem: {
          id: '',
          name: '',
          href: '',
          type: '3',
          isShow: '1',
          parentId: '',
          sort: 0
        },
        data2: [],
        addFlag: true,
        editFlag: false,
        confFlag: false,
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
        this.$http.get(api.SYS_RESOURCE_ID + "/" + id).then(res => {
          let result = res.data.data;
          this.formItem.name = result.name;
          this.formItem.href = result.href;
          this.formItem.type = result.type;
          this.formItem.isShow = result.isShow;
          this.formItem.sort = result.sort;
          this.formItem.parentId = result.parentId;
          this.formItem.id = result.id;

          if (this.formItem.type === '1') {
            this.editFlag = false;
          }else {
            this.editFlag = true;
          }
        })
        this.addFlag = false;
      },
      edit() {
        this.$http.post(api.SYS_RESOURCE_EDIT, this.formItem).then(res => {
          Message.message(res.data);
          this.getTreeResource();
          this.getResourceList();
        })
      },
      add() {
        this.$http.post(api.SYS_RESOURCE_ADD, this.formItem).then(res => {
          Message.message(res.data);
          //将放置在state中的树形菜单进行更新
          this.getTreeResource();
          this.getResourceList();
          this.addFlag = true;
          this.editFlag = false;
          this.$refs["formItem"].resetFields();
        })
      },
      toAdd(name) {
        this.editFlag = false;
        this.addFlag = true;
        this.$refs[name].resetFields();
        console.log(this.formItem)
      },
      del() {
        let delId = this.formItem.id;
        this.$http.get(api.SYS_RESOURCE_DELETE + "/" + delId).then(res => {
          Message.message(res.data);
          this.getTreeResource();
          this.getResourceList();
          this.$refs["formItem"].resetFields();
        })
      },
      getTreeResource() {
        //获取树菜单
        this.$http.get(api.SYS_RESOURCE_TREE).then(res => {
          this.data2 = res.data.data;
        });
      },
      getResourceList() {
        //获取菜单列表
        this.$http.get(api.SYS_RESOURCE_SELECT).then(res => {
          this.parentResourceList = res.data.data;
        });
      }

    },
    created() {
      this.getTreeResource();
      this.getResourceList();

    }

  }
</script>
<style>
  .sysresource-bg {
    padding: 16px;
  }

  .sysresource {
    padding-top: 16px;
  }

  .sysresource-content {
    margin-top: 16px;
  }

  .sysresource-item {
    /*border: 1px solid #dcdee2;*/
    padding: 10px;
  }

  .sysresource-right {
    padding: 10px;
  }

  /*tree Css*/
  .ivu-checkbox + span, .ivu-checkbox-wrapper + span {
    font-size: 1.2em;
  }

  .ivu-tree-title {
    /*width: 70%;*/
  }
</style>
