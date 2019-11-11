<template>
  <div class="approve-project-bg">
    <Card class="approve-project-bg">
      <Modal v-model="modal11" scrollable title="审批配置" @on-ok="ok2">
        <Form ref="formItem" :model="formItem" label-position="top">

          <FormItem label="审批角色" prop="approveRoleCode" >
            <Select v-model="formItem.approveRoleCode" filterable :disabled ="isReadonly">
              <Option v-for="item in approveRoleList" :value="item.code" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="empName" label="人员">
             <Input v-model="formItem.empName" placeholder="人员姓名" :readonly="false"></Input>
          </FormItem>
          <FormItem prop="empId" label="人员ID">
             <Input v-model="formItem.empId" placeholder="人员ID" :readonly="false"></Input>
          </FormItem>
          <FormItem prop="empCode" label="人员编码">
             <Input v-model="formItem.empCode" placeholder="人员编码" :readonly="false"></Input>
          </FormItem>
        </Form>
      </Modal>

      <Form ref="formItem" :model="formItem" :label-width="100" inline>
        <FormItem label="项目编码" prop="projCode">
          <Input v-model="formItem.projCode" @keyup.enter.native="search()" placeholder="项目编码"></Input>
        </FormItem>
        <FormItem label="项目名称" prop="projName">
          <Input v-model="formItem.projName" @keyup.enter.native="search()" placeholder="项目名称"></Input>
        </FormItem>
        <Button @click="search()" type="success">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
        <Button @click="handleGlobalConf('')" style="margin-left: 8px">统一角色配置</Button>
      </Form>
      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class=""></Table>

      <!-- 分页栏 -->
      <div class="approve-project-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>

</template>

<script>
  import * as api from '../../api/api'
  import * as utils from '../../common/utils'
  //参考 https://www.iviewui.com/components/table
  export default {
    data() {
      return {
        loading: false,
        modal11: false,
        approveRoleList: [],
        formItem: {
          approveRoleCode: '',
          empName: '',
          empId: '',
          empCode: '',
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
            totalCount: 0,
          }

        },
        listColumns: [
          {
            title: '序号',
            type: 'index',
            width: 65,
            align: 'center'
          },
          {
            title: '项目编码',
            key: 'code'
          },
          {
            title: '项目名称',
            key: 'name'
          },
          {
            title: '集团',
            key: 'deptname',
            width: 95
          },
          {
            title: '大区',
            key: 'areaname'
          },

          {
            title: '操作',
            key: 'action',
            width: 150,
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
                      // this.show(params.row.id)
                      this.$router.push({
                        path: "approve-proj-config",
                        query: {id: params.row.id , code: params.row.code , name: encodeURI(params.row.name)}
                      })
                    }
                  }
                }, '配置审批权限'),
              ]);
            }
          }],
        formItem: {
          projCode: '',
          projName: '',
        }
      };

    },
    created() {
      this.search();
      this.getApproveRoleList();
    },
    methods: {
      getData() {
        let path = "?projName=" + this.formItem.projName +
          "&projCode=" + this.formItem.projCode +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.COMMON_PROJECT_PAGE + path).then((res) => {
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
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleGlobalConf() {
        //统一导入角色人员
        this.modal11 = true;
      },
      ok2() {
        //随意数字
        this.formItem.projectId = 99999;
        this.$http.post(api.APPROVE_PROJECT_GLOBAL_CONF, this.formItem).then(res => {
          utils.message(res.data);
        });

      },
      getApproveRoleList() {
        this.$http.get(api.APPROVE_PROJECT_ROLE_LIST).then(res => {
          if (res.data.status === 200) {
            let data1 = res.data.data;
            this.approveRoleList = data1;
            for (let i = 0; i < data1.length; i++) {
              let data1Element = data1[i];
              this.approveRoles[data1Element.code] ={
                id: data1Element.id,
                code: data1Element.code,
                name: data1Element.name
              };
            }
          }
        });
      },
    }
  }
</script>
<style>
  .approve-project-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .approve-project-page {
    padding-top: 5px;
    float: right;
  }
</style>

