<template>
  <div class="act-membership-bg">
    <Modal v-model="modal13" scrollable title="增加审批人员">
      <Table stripe :loading="loading" border :columns="modal13ListColumns" :data="modal13PagerData.data" size="small"
             class=""></Table>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="modal11" scrollable title="审批配置" @on-ok="ok2">
      <Form ref="formItem" :model="formItem" label-position="top">
        <FormItem prop="type" label="类型">
          <Select v-model="formItem.type" filterable>
            <Option v-for="(value, key) in types" :value="key" :key="key"> {{value}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="province" label="省份">
          <Select v-model="formItem.province" filterable>
            <Option v-for="(value, key) in provinces" :value="key" :key="key"> {{value}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="empname" label="人员">
          <Row>
            <Col span="18">
              <Input v-model="formItem.empName" placeholder="人员姓名" :readonly="true"></Input>
            </Col>
            <Col span="4" offset="1">
              <Button @click="addEmpname()">添加人员</Button>
              <Button @click="deleteEmpname()">删除人员</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal12" width="960" scrollable title="增加审批人员">
      <Form ref="modalFormItem" :model="modalFormItem" inline>
        <FormItem prop="empname">
          <Input v-model="modalFormItem.empname" @keyup.enter.native="modalSearch()" placeholder="人员姓名"></Input>
        </FormItem>
        <FormItem prop="empcode">
          <Input v-model="modalFormItem.empcode" @keyup.enter.native="modalSearch()" placeholder="人员代码"></Input>
        </FormItem>
        <FormItem prop="fullname">
          <Input v-model="modalFormItem.fullname" @keyup.enter.native="modalSearch()" placeholder="部门名称"></Input>
        </FormItem>
        <Button @click="modalSearch()" type="success">查询</Button>
        <Button @click="handleReset('modalFormItem')" style="margin-left: 8px">清空</Button>
      </Form>
      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="modalListColumns" :data="modalPagerData.data" size="small"
             class=""></Table>

      <!-- 分页栏 -->
      <div class="act-membership-page">
        <Page :total="modalPagerData.page.totalCount" :current="modalPagerData.page.pageCurrent"
              :page-size="modalPagerData.page.pageSize"
              :page-size-opts="pagerData.page.arrPageSize"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
      <div slot="footer"></div>
    </Modal>

    <Card class="act-membership-bg">
      <Form ref="searchFormItem" :model="searchFormItem" :label-width="80" inline>
        <FormItem label="编码" prop="code">
          <Input v-model="searchFormItem.code" @keyup.enter.native="search()" placeholder="招标编号"></Input>
        </FormItem>
        <FormItem label="名称" prop="title">
          <Input v-model="searchFormItem.name" @keyup.enter.native="search()" placeholder="招标标题"></Input>
        </FormItem>
        <Button type="info" class="btn-title" @click="search()">查询</Button>
        <Button @click="handleReset('searchFormItem')" style="margin-left: 8px">清空</Button>
        <Button type="success" class="btn-title" @click="add">新建</Button>
      </Form>
      <div style="padding-bottom: 16px;">
        <Tag checkable color="success" type="dot"> 角色： {{groupName}}</Tag>
      </div>

      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class="">
      </Table>
    </Card>
  </div>

</template>

<script>
  //参考 https://www.iviewui.com/components/table
  import * as api from '../../api/api'
  import * as utils from '../../common/utils'

  export default {
    data() {
      return {
        loading2: false,
        loading: false,
        modal12: false,
        modal11: false,
        modal13: false,
        modalTitleFlag: '',
        groupId: '',
        groupName: '',
        groupCode: '',
        formInfo: {
          empId: '',
          approveRoleId: '',
        },
        searchFormItem: {
          code: '',
          name: ''
        },
        pagerData: {
          data: [],
          page: {
            //分页数
            arrPageSize: [10, 20, 30, 40],
            //分页大小
            pageSize: 10,
            //总分页数
            pageCount: 1,
            //当前页面
            pageCurrent: 1,
            //总数
            totalCount: 0
          }

        },
        listColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '类型',
            key: 'type',
            render: (h, params) => {
              const row = params.row;
              console.log(this.types)
              console.log(row.type)
              const text = this.types[row.type];
              return h('Tag', {
                props: {}
              }, text);
            }
          },
          {
            title: '省份',
            key: 'province',
            render: (h, params) => {
              const row = params.row;
              const text = this.provinces[row.province];
              return h('Tag', {
                props: {}
              }, text);
            }
          },
          {
            title: '编码',
            key: 'empCode'
          },
          {
            title: '名称',
            key: 'empName'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal11 = true;
                      let row = params.row;
                      this.formItem.empName = row.empName;
                      this.formItem.empCode = row.empCode;
                      this.formItem.province = row.province;
                      this.formItem.type = row.type;
                      this.formItem.id = row.id;
                    }
                  }
                }, '修改'),

                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.del(params.row.id);
                    }
                  }
                }, '删除')

              ]);
            }
          }],
        empList: [],
        formItem: {
          id: '',
          province: '',
          empName: '',
          empCode: '',
          approveRoleCode: '',
          type: ''
        },
        modalFormItem: {
          empname: '',
          empcode: '',
          fullname: ''
        },
        modal13ListColumns: [
          {
            title: '人员姓名',
            key: 'empname',
          },
          {
            title: '用户登录名',
            key: 'userid',
          },
          {
            title: '操作',
            key: 'action',
            width: 95,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      //配置资源
                      this.modal13 = false;
                      let data = this.modal13PagerData.data;
                      data.splice(params.index, 1);
                      if (!data) {
                        this.formItem.empCode = "";
                        this.formItem.empName = "";
                      } else {
                        let empNames = "";
                        let empCodes = "";
                        data.forEach(e => {
                          empNames += e.empname + ",";
                          empCodes += e.userid + ","
                        });
                        this.formItem.empName = empNames.substring(0, empNames.length - 1);
                        this.formItem.empCode = empCodes.substring(0, empCodes.length - 1);

                      }
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        modal13PagerData: {
          data: []
        },
        modalPagerData: {
          data: [],
          page: {
            //分页数
            arrPageSize: [10, 10, 30, 40],
            //分页大小
            pageSize: 10,
            //总分页数
            pageCount: 1,
            //当前页面
            pageCurrent: 1,
            //总数
            totalCount: 0
          }

        },
        modalListColumns: [{
          title: '人员姓名',
          key: 'empname',
          width: 95
        },

          {
            title: '人员代码',
            key: 'empcode',
            width: 120
          },
          {
            title: '性别',
            key: 'gender',
            width: 75,
            render: (h, params) => {
              const row = params.row;
              const color = row.gender === 1 ? 'primary' : row.gender == 2 ? 'success' : 'warning';
              const text = row.gender === 1 ? 'Working' : row.gender == 2 ? '女' : '男';

              return h('Tag', {
                props: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: '所属部门',
            key: 'fullname'
          },
          {
            title: '用户登录名',
            key: 'userid',
            width: 160
          },
          {
            title: '操作',
            key: 'action',
            width: 95,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      //配置资源
                      this.modal12 = false;
                      this.addMembership(params.row.empid, params.row.userid, params.row.empname)
                    }
                  }
                }, '增加'),
              ]);
            }
          }],
        types: {},
        provinces: {}
      };

    },
    created() {
      this.getDictType();
      this.groupId = this.$route.query.id;
      this.groupCode = this.$route.query.code;
      this.groupName = decodeURI(this.$route.query.name);
      this.search();
      this.provinces = this.$store.state.provinces;
    },
    methods: {
      getActUserData() {
        let path = "?groupCode=" + this.groupCode;
        this.$http.get(api.APPROVE_MEMBERSHIP_LIST + path).then((res) => {
          if (res.data.status === 200 && res.data.data != null) {
            this.pagerData.data = res.data.data;
          }
        })
      },
      getData() {
        let path = "?empname=" + this.modalFormItem.empname +
          "&empcode=" + this.modalFormItem.empcode +
          "&fullname=" + this.modalFormItem.fullname +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.APPROVE_SYS_USER_LIST + path).then((res) => {
          this.modalPagerData.data = res.data.data.records;
          this.modalPagerData.page.totalCount = res.data.data.total;
          this.modalPagerData.page.pageCount = res.data.data.pages;
        })
      },
      addMembership(empid, empCode, empName) {
        if (this.formItem.empName) {
          this.formItem.empName += "," + empName;
          this.formItem.empCode += "," + empCode;
        } else {
          this.formItem.empName = empName;
          this.formItem.empCode = empCode;
        }
      },
      remove(index) {

      },
      onPageSizeChange(newSize) {
        this.pagerData.page.pageCurrent = 1;
        this.pagerData.page.pageSize = newSize;
        this.getData();
      },
      changePage(newCurrent) {
        this.pagerData.page.pageCurrent = newCurrent;
        this.getData();
      },
      add() {
        this.modal11 = true;
      },
      addEmpname() {
        this.modal12 = true;
        this.handleReset("modalFormItem");
        // this.modalTitleFlag = 'add';
      },
      deleteEmpname() {
        this.modal13 = true;
        this.modal13PagerData.data = [];
        let empNames = this.formItem.empName;
        let empCodes = this.formItem.empCode;
        if (empNames) {
          let empName = empNames.split(",");
          let empCode = empCodes.split(",");

          for (let i = 0; i < empName.length; i++) {
            this.modal13PagerData.data.push({
              empname: empName[i],
              userid: empCode[i]

            });
          }

        }

      },
      del(id) {
        this.$http.get(api.APPROVE_MEMBERSHIP_DELETE + id).then(res => {
          this.search();
        });
      },
      search() {
        this.getActUserData();
      },
      modalSearch() {
        this.getData();
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      getDictType() {
        this.types = utils.getData("userType")
      },
      ok2() {
        if (this.formItem.id) {
          //修改
          this.formItem.approveRoleCode = this.groupCode;
          this.formItem.approveRoleId = this.groupId;
          this.$http.post(api.APPROVE_MEMBERSHIP_EDIT, this.formItem).then((res) => {
            utils.message(res.data);
            if (res.data.status === 200) {
              this.$refs['formItem'].resetFields();
              this.search();
            }
          });
          return;
        }
        //新增
        this.formItem.approveRoleCode = this.groupCode;
        this.formItem.approveRoleId = this.groupId;
        console.log(this.formItem)
        this.$http.post(api.APPROVE_MEMBERSHIP_SAVE, this.formItem).then((res) => {
          utils.message(res.data);
          if (res.data.status === 200) {
            this.$refs['formItem'].resetFields();
            this.search();
          }
        })
      },

    }

  }
</script>
<style>
  .act-membership-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .act-membership-page {
    padding-top: 16px;
  }

  .btn-title {
    margin-right: 1em;
  }

</style>
