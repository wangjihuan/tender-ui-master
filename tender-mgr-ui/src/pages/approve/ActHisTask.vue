<template>
  <div class="approve-role-bg">
    <Modal v-model="modal13" width="700" draggable scrollable title="审批" @on-ok="onOk1()">
      <Tag color="primary">流程实例ID: {{processInstanceId}}</Tag>
      <img :src="flowImg"  alt="流程图" style="width: 90%"/>
      <div style="margin-top: 1em">
        <Table stripe :loading="loading" border :columns="modelListColumns" :data="modalPagerData.data" class=""></Table>
      </div>
    </Modal>
    <Card class="approve-role-bg">
      <Form ref="formItem" :model="formItem" :label-width="100" inline>
        <FormItem label="审批角色" prop="name">
          <Input v-model="formItem.name" @keyup.enter.native="search()" placeholder="审批角色"></Input>
        </FormItem>
        <Button @click="search()" type="success">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
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

  export default {
    name: "ApproveRole",
    data() {
      return {
        loading: false,
        modal12: false,
        modal13: false,
        modalTitleFlag: '',
        flowImg: '',
        processInstanceId: '',
        formInfo: {
          id: '',
          name: '',
        },
        formItem: {
          name: ''
        },
        modelListColumns:[
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
            width: 140,
            key: 'name'
          },
          {
            title: '时间',
            key: 'createTime',
            width: 170,
            align: 'center',
          },
          {
            title: '详细信息',
            key: 'details'
          },
          {
            title: '操作',
            key: 'action',
            width:'130',
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
                      this.modal13 = true;
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
                    marginRight: '1px',
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
        this.$http.get(api.HIS_TASK_LIST + path).then((res) => {
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
      onOk1() {

      },
      getCommentBy(processInstanceId) {
        this.modal13 = true;
        this.$http.get(api.HIS_TASK_COMMENT + processInstanceId).then(res => {
          let data1 = res.data;
          if (data1.status === 200) {
            this.modalPagerData.data = data1.data;

          }
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
            query: {component:"shenpi"},
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
