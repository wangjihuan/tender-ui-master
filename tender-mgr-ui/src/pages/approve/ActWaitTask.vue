<template>
  <div class="approve-role-bg">
    <Modal v-model="modal14" draggable scrollable title="流程图" width="600">
      <Tag color="primary">流程实例ID: {{processInstanceId}}</Tag>
      <img :src="flowImg" alt="流程图" style="width: 90%"/>
      <div style="margin-top: 1em">
        <Table stripe :loading="loading" border :columns="modelListColumns" :data="modalPagerData.data"
               class=""></Table>
      </div>
    </Modal>
    <Modal v-model="modal13" draggable scrollable title="审批" @on-ok="onOk1()">
      <Input v-model="formDo.comment" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="审批意见"/>
      <!--历史审批-->
      <div slot="footer">
        <Button type="error" @click="pass('2')">不同意</Button>
        <Button type="success" @click="pass('1')">同意</Button>
      </div>
    </Modal>
    <Modal v-model="modal12" draggable scrollable :title="modalTitleFlag === 'edit'?'编辑角色':'新增角色'" @on-ok="onOk()">
      <Form ref="formInfo" :model=formInfo :label-width="80" style="padding: 16px">
        <FormItem label="角色编码" prop="id">
          <Input v-model="formInfo.id" placeholder="角色编码"></Input>
        </FormItem>
        <FormItem label="角色名称" prop="name">
          <Input v-model="formInfo.name" placeholder="角色名称"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Card class="approve-role-bg">
      <Form ref="formItem" :model="formItem" :label-width="100" inline>
        <FormItem label="代办任务" prop="name">
          <Input v-model="formItem.name" @keyup.enter.native="search()" placeholder="代办任务"></Input>
        </FormItem>
        <Button @click="search()" type="success">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
        <!--<Button type="success" class="btn-title" @click="add">新建</Button>-->
      </Form>
      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class=""></Table>

      <!-- 分页栏 -->
      <div class="approve-role-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>
</template>

<script>
  import * as api from '../../api/api'
  import * as Message from '../../common/utils'

  export default {
    name: "ApproveRole",
    data() {
      return {
        loading: false,
        modal12: false,
        modal13: false,
        modal14: false,
        modalTitleFlag: '',
        flowImg: '',
        formInfo: {
          id: '',
          name: '',
        },
        formItem: {
          name: ''
        },
        processInstanceId: '',
        formDo: {
          businessId: '',
          businessType: '',
          taskId: '',
          processInstanceId: '',
          state: '',
          comment: '',
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
          // {
          //   title: '审批角色编码',
          //   key: 'id'
          // },
          {
            title: '审批角色',
            key: 'name',
            width: 165,
          },
          {
            title: '时间',
            key: 'createTime',
            width: 170,
          },
          {
            title: '详细信息',
            key: 'details'
          },
          {
            title: '操作',
            key: 'action',
            width: 160,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    color: '#05c697',
                    cursor: 'pointer',
                    marginRight: '15px'
                  },
                  domProps: {
                    innerHTML: "<i class='iconfont icon-liuchengchaxun'></i>",
                    title: "点击查看流程图"
                  },
                  on: {
                    click: () => {
                      //显示流程图及历史批注
                      this.modal14 = true;
                      this.flowImg = api.WAIT_TASK_FLOW_IMG + params.row.processInstanceId;
                      this.processInstanceId = params.row.processInstanceId;
                      this.getCommentBy(this.processInstanceId);
                    }
                  }
                }, '查看流程图'),
                h('span', {
                  style: {
                    color: '#1296db',
                    cursor: 'pointer',
                    marginRight: '10px',
                  },
                  domProps: {
                    innerHTML: "<i style='font-size: 28px' class='iconfont icon-chakanxiangqing'></i>",
                    title: "查看详情"
                  },
                  on: {
                    click: () => {
                      this.toBussinessDetails(params.row.businessId, params.row.businessType, params.row.id, params.row.processInstanceId)
                    }
                  }
                }, '查看详情'),
                h('span', {
                  style: {
                    color: '#d81e06',
                    cursor: 'pointer',
                    marginRight: '1px',
                  },
                  domProps: {
                    innerHTML: "<i style='font-size: 28px' class='iconfont icon-zhengwushenpi'></i>",
                    title: "审批"
                  },
                  on: {
                    click: () => {
                      this.modal13 = true;
                      this.formDo.businessId = params.row.businessId;
                      this.formDo.businessType = params.row.businessType;
                      this.formDo.taskId = params.row.id;
                      this.formDo.processInstanceId = params.row.processInstanceId;
                      // this.toApprove(params.row.businessId, params.row.businessType, params.row.id, params.row.processInstanceId)
                    }
                  }
                }, '审批'),
              ]);
            }
          }
        ],

      }
    },
    methods: {
      getData() {
        let path = "?name=" + this.formItem.name +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.WAIT_TASK_LIST + path).then((res) => {
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
      onOk() {
        if (this.modalTitleFlag === 'edit') {
          this.formInfo.isEnabled = this.formInfo.isEnabled && 1 || 2;
          this.$http.post(api.APPROVE_ROLE_EDIT, this.formInfo).then(res => {
            let data1 = res.data;
            Message.message(data1);
            if (data1.status === 200) {
              this.getData();
              // this.$router.push({
              //   path: "/tender-card",
              // })
            }

          });
        } else if (this.modalTitleFlag === 'add') {
          this.formInfo.isEnabled = this.formInfo.isEnabled && 1 || 2;
          this.$http.post(api.APPROVE_ROLE_SAVE, this.formInfo).then(res => {
            let data1 = res.data;
            Message.message(data1);
            if (data1.status === 200) {
              this.getData();
            }

          });
        }
      },
      onOk1() {

      },
      add() {
        this.modal12 = true;
        this.handleReset("formInfo")
        this.formInfo.id = '';
        this.modalTitleFlag = 'add';
      },
      del(id) {
        this.$http.get(api.APPROVE_ROLE_DELETE + "?id=" + id).then(res => {
          this.search();
        });
      },
      toBussinessDetails(businessId, businessType, taskId, processInstanceId) {
        if (businessType === "tender_publish") {
          //发标审核
          this.$http.get(api.TENDER_ID + businessId).then(res => {
            if(res.data.data==null){
              this.$Modal.error({
                title: "该标书详情已被删除！",
                okText: '确认',
              });
            }else {
              this.$router.push({
                path: "/tender-publish/card/" + businessId,
                query: {component: "shenpi"},
              });
            }
          })


        } else if (businessType === "tender_supplier") {
          //供应商审核
          this.$router.push({
            path: "/supplier/" + businessId,
            query: {component: "shenpi"},
            // query: {id: params.row.id, name: encodeURI(params.row.name)},
          });
        } else if (businessType === "tender_open") {
          //开标审核
          this.$router.push({
            path: "/tender-open/card/" + businessId,
            query: {component: "shenpi"},
          });
        }
      },
      pass(value) {
        this.modal13 = false;
        this.formDo.state = value;
        this.$http.post(api.WAIT_TASK_DO, this.formDo).then(res => {
          let data1 = res.data;
          Message.message(data1);
          if (data1.status === 200) {
            this.getData();
          }
        });
        // this.formDo.comment = '';
      },
      getCommentBy(processInstanceId) {
        this.$http.get(api.WAIT_TASK_HIS_TASK_COMMENT + processInstanceId).then(res => {
          let data1 = res.data;
          if (data1.status === 200) {
            this.modalPagerData.data = data1.data;

          }
        });
      },
    },
    created() {
      this.getData();
    },
    mounted() {
    }
  }

</script>

<style scoped>
  .approve-role-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .approve-role-page {
    padding-top: 5px;
    float: right;
  }
</style>
