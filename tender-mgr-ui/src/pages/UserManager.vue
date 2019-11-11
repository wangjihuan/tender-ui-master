<template>
  <div class="sysuser-bg">
    <Modal v-model="modal12" draggable scrollable title="角色配置" @on-ok="congRole()">
      <Tree :data="data1" ref="tree1" show-checkbox></Tree>
    </Modal>
    <Card class="sysuser">
      <Row class="sysuser-content">
        <Col span="24">
          <Card>
            <Form ref="formItem" :model="formItem" :label-width="80" inline>
              <FormItem label="人员姓名" prop="empname">
                <Input v-model="formItem.empname" @keyup.enter.native="search()" placeholder="人员姓名"></Input>
              </FormItem>
              <FormItem label="人员代码"  prop="empcode">
                <Input v-model="formItem.empcode" @keyup.enter.native="search()" placeholder="人员代码"></Input>
              </FormItem>
              <FormItem label="部门"  prop="fullname">
                <Input v-model="formItem.fullname" @keyup.enter.native="search()" placeholder="部门名称"></Input>
              </FormItem>
              <Button @click="search()" type="success">查询</Button>
              <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
            </Form>
            <!-- 数据表格 -->
            <Table id="mygrid" stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class=""></Table>

            <!-- 分页栏 -->
            <div class="tenderlist-page">
              <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
                    @on-page-size-change="onPageSizeChange"
                    @on-change="changePage" size="small" show-elevator show-sizer show-total/>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>

</template>

<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'
  //参考 https://www.iviewui.com/components/table
  export default {
    data() {
      return {
        loading: false,
        modal12: false,
        empid:'',
        data1:[],
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
            totalCount: 0,
          }

        },
        data2: [],
        listColumns: [{
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
                      this.modal12 = true;
                      this.getTreeMenu();
                      this.empid=params.row.empid
                    }
                  }
                }, '角色配置'),
              ]);
            }
          }],
        formItem: {
          empname: '',
          empcode: '',
          fullname: ''
        }
      };

    },
    created() {
      this.search()
    },
    methods: {
      getData() {
        let path = "?empname=" + this.formItem.empname +
          "&empcode=" + this.formItem.empcode +
          "&fullname=" + this.formItem.fullname +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.SYS_USER_LIST + path).then((res) => {
          this.pagerData.data = res.data.data.records;
          this.pagerData.page.totalCount = res.data.data.total;
          this.pagerData.page.pageCount = res.data.data.pages;
        })
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
      search() {
        this.getData();
      },
      getTreeMenu() {
        //获取树菜单
        this.$http.get(api.SYS_USER_GETROLES + "/" + this.empid).then(res => {
          this.data1 = res.data.data;
        })
      },
      congRole() {
        let checkedNodes = this.$refs.tree1.getCheckedNodes();
        let length = checkedNodes.length;
        let params = {empid:this.empid , roleMenus:[]};
        if (length !== 0) {
          for (let i = 0; i <length; i++) {
            let checkedNode = checkedNodes[i];
            params.roleMenus.push({
              empId: this.empid,
              roleId: checkedNode.id
            });
          }
        }
        this.$http.post(api.SYS_USER_ROLE , params).then(res => {
          Message.message(res.data);
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }
  }
</script>
<style>
  .sysuser-bg {
    padding: 16px;
  }

  .sysuser {
    padding-top: 16px;
  }

  .sysuser-content {
    margin-top: 16px;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }

</style>
