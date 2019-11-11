<template>
  <div class="tenderlist-bg">
    <Modal v-model="modal14" draggable scrollable title="流程图" width="700">
      <Tag color="primary">流程实例ID: {{processInstanceId}}</Tag>
      <Tag color="primary" v-if="selectApprovePublishStatus===1">当前环节办理人: {{approvePerson}}</Tag>
      <img :src="flowImg" alt="流程图" style="width: 90%"/>
      <div style="margin-top: 1em">
        <Table stripe :loading="loading" border :columns="modelListColumns" :data="modalPagerData.data"
               class=""></Table>
      </div>
    </Modal>
    <Card class="tenderlist-bg">
      <Form ref="formItem" :model="formItem" :label-width="100" inline>
        <FormItem label="企业名称" prop="companyName">
          <Input v-model="formItem.companyName" @keyup.enter.native="search()" placeholder="企业名称"></Input>
        </FormItem>
        <FormItem label="组织机构代码" prop="orgCode">
          <Input v-model="formItem.orgCode" @keyup.enter.native="search()" placeholder="组织机构代码"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select v-model="formItem.status" placeholder="请选择" style="width: 140px" @keyup.enter.native="search()">
            <Option value="4">未激活</Option>
            <Option value="1">审核中</Option>
            <Option value="2">已审核</Option>
            <Option value="3">未通过</Option>
          </Select>
        </FormItem>
        <Button @click="search()" type="success">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
      </Form>
      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" border :columns="listColumns" :data="pagerData.data"
             class=""></Table>

      <!-- 分页栏 -->
      <div class="supplierlist-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>

</template>

<script>
  import * as api from '../api/api'
  //参考 https://www.iviewui.com/components/table
  export default {
    data() {
      return {
        loading: false,
        modal14: false,
        processInstanceId: '',
        selectApprovePublishStatus: '',
        approvePerson: '',
        flowImg: '',
        modalPagerData: {
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
        modelListColumns: [
          {
            title: '序号',
            type: 'index',
            width: 65,
            align: 'center'
          },
          {
            title: '时间',
            key: 'time'
          },
          {
            title: '审批人',
            key: 'userId'
          },
          {
            title: '审批意见',
            key: 'fullMessage'
          },
        ],
        listColumns: [
          {
            title: '序号',
            type: 'index',
            width: 65,
            align: 'center'
          },
          {
            title: '企业名称',
            key: 'companyName'
          },
          {
            title: '企业邮箱',
            key: 'companyEmail'
          },
          {
            title: '组织机构代码证',
            key: 'orgCode'
          },
          {
            title: '联系人',
            key: 'contact',
            width: 95
          },
          {
            title: '状态',
            key: 'status',
            width: 95,
            render: (h, params) => {
              const row = params.row;
              let color = '';
              let text = '';
              if (row.status == 1) {
                color = 'primary';
                text = '审核中'
              }
              else if (row.status == 2) {
                color = 'success';
                text = '已审核'
              }
              else if (row.status == 3) {
                color = 'error';
                text = '未通过'
              }
              else if (row.status == 4) {
                color = 'warning';
                text = '待激活'
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: color,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      //获取流程ID
                      this.$http.get(api.PROCESS_SUPPLIER_ID + "/" + params.row.id).then((res) => {
                        this.processInstanceId = res.data.data;
                        if (this.processInstanceId == null) {
                          this.$Message.warning('该用户还未发起流程!');
                        }else {
                          // 显示流程图及历史批注
                          this.modal14 = true;
                          this.flowImg = api.WAIT_TASK_FLOW_IMG + this.processInstanceId;
                          this.getCommentBy(this.processInstanceId);
                          //显示当前环节操作人
                          this.selectApprovePublishStatus = row.status;
                          if (row.status === 1) {
                            this.getApprovePerson(this.processInstanceId);
                          }

                        }
                      })
                    }
                  }
                }, text),
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 70,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  // props: {
                  //   type: 'primary',
                  //   size: 'small'
                  // },
                  // style: {
                  //   marginRight: '5px'
                  // },
                  style: {
                    color: '#1296db',
                    cursor: 'pointer',
                    marginRight: '5px',
                  },
                  domProps: { // 添加标签,使用自己引入的iconfont图标
                    innerHTML: "<i class='iconfont icon-view'></i>",
                    title: "点击查看"
                  },
                  on: {
                    click: () => {
                      // this.show(params.row.id)
                      // this.getData()
                      this.$router.push({
                        path: "supplier/" + params.row.id,
                        // params: {id: params.row.id}
                      })
                    }
                  }
                }, '查看'),
              ]);
            }
          }],
        formItem: {
          companyName: '',
          orgCode: '',
          status: ''
        }
      };

    },
    created() {
      this.search()
    },
    methods: {
      getData() {
        if (this.formItem.status == "undefined" || this.formItem.status == "" || this.formItem.status == null) {
          this.formItem.status = "";
        }
        let path = "?companyName=" + this.formItem.companyName +
          "&orgCode=" + this.formItem.orgCode +
          "&status=" + this.formItem.status +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.SUPPLIER_LIST + path).then((res) => {
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
      getCommentBy(processInstanceId) {
        this.$http.get(api.WAIT_TASK_HIS_TASK_COMMENT + processInstanceId).then(res => {
          let data1 = res.data;
          if (data1.status === 200) {
            this.modalPagerData.data = data1.data;

          }
        });
      },
      getApprovePerson(processInstanceId) {
        this.$http.get(api.PROCESS_SUPPLIER_TASK_PERSON + processInstanceId).then(res => {
          let data1 = res.data;
          if (data1.status === 200) {
            this.approvePerson = res.data.data;
          }
        });
      }
    }
  }
</script>
<style>
  .tenderlist-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .supplierlist-page {
    padding-top: 5px;
    float: right;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
