<template>
  <div class="tenderlist-bg">
    <Modal v-model="modal14" draggable scrollable title="流程图" width="700">
      <Tag color="primary">流程实例ID: {{processInstanceId}}</Tag>
      <Tag color="primary" v-if="selectApproveOpenStatus===1">当前环节办理人: {{approvePerson}}</Tag>

      <img :src="flowImg" alt="流程图" style="width: 90%"/>
      <div style="margin-top: 1em">
        <Table stripe :loading="loading" border :columns="modelListColumns" :data="modalPagerData.data"
               class=""></Table>
      </div>
    </Modal>
    <Card class="tenderlist-bg">
      <Form ref="formItem" :model="formItem" :label-width="80" inline>
        <FormItem label="招标编号" prop="code">
          <Input v-model="formItem.code" @keyup.enter.native="search()" placeholder="招标编号"></Input>
        </FormItem>
        <FormItem label="招标标题" prop="title">
          <Input v-model="formItem.title" @keyup.enter.native="search()" placeholder="招标标题"></Input>
        </FormItem>
        <FormItem label="项目名称" prop="projectName">
          <Input v-model="formItem.projectName" @keyup.enter.native="search()" placeholder="项目名称"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select v-model="formItem.status" placeholder="请选择" style="width: 190px" @keyup.enter.native="search()">
            <Option value="6">待开标</Option>
            <Option value="7">已定标</Option>
            <Option value="8">流标</Option>
          </Select>
        </FormItem>
        <Button type="info" class="btn-title" @click="search()">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
      </Form>
      <div style="width: 99%">
        <!-- 数据表格 -->
        <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class="">
        </Table>
        <div class="openlist-page">
          <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
                @on-page-size-change="onPageSizeChange"
                @on-change="changePage" size="small" show-elevator show-sizer show-total/>
        </div>
      </div>

    </Card>
  </div>
</template>

<script>
  import * as api from '../api/api'

  export default {
    name: "TenderOpen",
    data() {
      return {
        loading: false,
        modal14: false,
        processInstanceId: '',
        approvePerson: '',
        flowImg: '',
        selectApproveOpenStatus: '',
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
            totalCount: 0
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
        listcolumns: [
          {
            type: 'index',
            title: '序号',
            width: 65,
            align: 'center'
          },
          {
            title: '招标编号',
            key: 'code'
          },
          {
            title: '招标标题',
            key: 'title'
          },
          {
            title: '项目名称',
            key: 'projectName'
          },
          {
            title: '开始日期',
            key: 'startDateTender',
            width: '120px'
          },
          {
            title: '截止日期',
            key: 'endDateTender',
            width: '120px'
          },
          {
            title: '发布日期',
            key: 'publishTime',
            width: '120px'
          },
          {
            title: '招标状态',
            key: 'status',
            width: 100,
            render: (h, params) => {
              const row = params.row;
              let color = this.$store.state.tenderStatusColors[row.status];
              let text = this.$store.state.tenderStatus[row.status];
              return h('Tag', {
                props: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: '审批状态',
            key: 'approveOpenStatus',
            width: 100,
            render: (h, params) => {
              const row = params.row;
              let color = this.$store.state.tenderOpenStatusColors[row.approveOpenStatus];
              let text = this.$store.state.tenderOpenStatus[row.approveOpenStatus];
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
                      this.$http.get(api.PROCESS_OPEN_ID + "/" + params.row.id).then((res) => {
                        this.processInstanceId = res.data.data;
                        if (this.processInstanceId == null) {
                          this.$Message.warning('该标书还未发起流程!');
                        }else {
                          // 显示流程图及历史批注
                          this.modal14 = true;
                          this.flowImg = api.WAIT_TASK_FLOW_IMG + this.processInstanceId;
                          this.getCommentBy(this.processInstanceId);

                          //显示当前环节操作人
                          this.selectApproveOpenStatus = row.approveOpenStatus;
                          if (row.approveOpenStatus === 1) {
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
              const row = params.row;
              let text = '';
              let titles = '';
              let colors = '';
              if (row.status == 6) {
                text = "<i class='iconfont icon-zhengzaizhaobiao'></i>"
                titles='点击开标'
                colors='#1afa29'
              } else if(row.status == 7) {
                text = "<i class='iconfont icon-xiugai'></i>"
                titles='点击修改'
                colors='#1296db'
              } else{
                text = "<i class='iconfont icon-view'></i>"
                titles='点击查看'
                colors='#1296db'
              }
              return h('div', [
                h('span', {
                  // props: {
                  //   type: color,
                  //   size: 'small'
                  // },
                  // style: {
                  //   marginRight: '5px'
                  // },
                  style:{
                    color:colors,
                    cursor: 'pointer',
                    marginRight: '5px',
                  },
                  domProps: { // 添加标签,使用自己引入的iconfont图标
                    innerHTML: text,
                    title: titles
                  },
                  on: {
                    click: () => {
                      this.getData()
                      // if (params.row.status == 5) {
                      this.$router.push({
                        path: "tender-open/card/" + params.row.id,
                      })
                      // }
                    }
                  }
                }),
              ]);
            }
          }],
        formItem: {
          code: '',
          title: '',
          projectName:'',
          status:''
        }
      }
    },
    created() {
      this.search()
    },
    methods: {
      getData() {
        if (this.formItem.status == "undefined" || this.formItem.status == "" || this.formItem.status == null) {
          this.formItem.status = "";
        }
        let path = "?code=" + this.formItem.code +
          "&title=" + this.formItem.title +
          "&projectName=" + this.formItem.projectName +
          "&status=" + this.formItem.status +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.OPEN_TENDER_LIST + path).then((res) => {
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
        this.$http.get(api.TENDER_TASK_PERSON + processInstanceId).then(res => {
          let data1 = res.data;
          if (data1.status === 200) {
            this.approvePerson = res.data.data;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .openlist-page {
    padding-top: 5px;
    float: right;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
