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
        <!--<FormItem label="开始日期" prop="startDate">-->
        <!--<Input v-model="formItem.startDate" @keyup.enter.native="search()" placeholder="起止日期"></Input>-->
        <!--</FormItem>-->
        <FormItem label="招标状态" prop="status">
          <Select v-model="formItem.status" placeholder="请选择" style="width: 190px" @keyup.enter.native="search()">
            <Option value="1">保存</Option>
            <Option value="2">待报名</Option>
            <Option value="3">报名中</Option>
            <Option value="4">报名截止</Option>
            <Option value="5">招标中</Option>
            <Option value="6">评标中</Option>
            <Option value="7">已定标</Option>
            <Option value="8">流标</Option>
          </Select>
        </FormItem>
        <!--<FormItem label="发布日期" prop="publishDate">-->
        <!--<Input v-model="formItem.publishDate" @keyup.enter.native="search()" placeholder="发布日期"></Input>-->
        <!--</FormItem>-->
        <Button type="info" class="btn-title" @click="search()">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
        <Button type="success" class="btn-title" style="margin-left: 8px" @click="add">新建</Button>
      </Form>
      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class="">
      </Table>

      <div class="tenderopenlist-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>

</template>

<script>
  //参考 https://www.iviewui.com/components/table
  import * as api from '../api/api'
  import * as Message from '../common/utils'

  export default {
    data() {
      return {
        loading: false,
        modal14: false,
        processInstanceId: '',
        approvePerson: '',
        selectApprovePublishStatus: '',
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
            title: '',
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '招标编号',
            key: 'code'
          },
          {
            title: '招标标题',
            // key: 'title',
            render: (h, params) => {
              return h('div', [
                h('Tooltip', {
                  props: {placement: 'top'}
                }, [
                  h('span', {
                    style: {
                      display: 'inline-block',
                      width: params.column._width * 0.9 + 'px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  }, params.row.title),
                  h('span', {
                    slot: 'content',
                    style: {whiteSpace: 'normal', wordBreak: 'break-all'}
                  }, params.row.title)
                ])
              ])
            }
          },
          {
            title: '项目名称',
            key: 'projectName',
            render: (h, params) => {
              return h('div', [
                h('Tooltip', {
                  props: {placement: 'top'}
                }, [
                  h('span', {
                    style: {
                      display: 'inline-block',
                      width: params.column._width * 0.9 + 'px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  }, params.row.projectName),
                  h('span', {
                    slot: 'content',
                    style: {whiteSpace: 'normal', wordBreak: 'break-all'}
                  }, params.row.projectName)
                ])
              ])
            }
          },
          {
            title: '开始日期',
            key: 'startDateTender',
            width: 110,
          },
          {
            title: '截止日期',
            key: 'endDateTender',
            width: 110,
          },
          {
            title: '招标状态',
            key: 'status',
            width: 110,
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
            key: 'approvePublishStatus',
            width: 100,
            render: (h, params) => {
              const row = params.row;
              let color = this.$store.state.tenderOpenStatusColors[row.approvePublishStatus];
              let text = this.$store.state.tenderOpenStatus[row.approvePublishStatus];
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
                      this.$http.get(api.PROCESS_ID + "/" + params.row.id).then((res) => {
                        this.processInstanceId = res.data.data;
                        if (this.processInstanceId == null) {
                          this.$Message.warning('该标书还未发起流程!');
                        } else {
                          // 显示流程图及历史批注
                          this.modal14 = true;
                          this.flowImg = api.WAIT_TASK_FLOW_IMG + this.processInstanceId;
                          this.getCommentBy(this.processInstanceId);
                          //显示当前环节操作人
                          this.selectApprovePublishStatus = row.approvePublishStatus;
                          if (row.approvePublishStatus === 1) {
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
            title: '发布日期',
            key: 'publishTime',
            width: 110,
          },
          {
            title: '操作',
            key: 'action',
            width: 95,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  // props: {
                  //   type: 'primary',
                  //   size: 'small'
                  // },
                  style: {
                    color: '#1296db',
                    cursor: 'pointer',
                    marginRight: '8px',
                  },
                  domProps: {
                    innerHTML: "<i class='iconfont icon-view'></i>",
                    title: "点击查看"
                  },
                  on: {
                    click: () => {
                      this.getData()
                      this.$router.push({
                        path: "tender-publish/card/" + params.row.id
                      })
                    }
                  }
                }),
                h('span', {
                  // props: {
                  //   type: 'error',
                  //   size: 'small'
                  // },
                  style: {
                    color: '#d81e06',
                    cursor: 'pointer',
                    marginRight: '1px',
                  },
                  domProps: { // 添加标签,使用自己引入的iconfont图标
                    innerHTML: "<i class='iconfont icon-delete1'></i>",
                    title: "点击删除"
                  },
                  on: {
                    click: () => {
                      if (params.row.status != 1) {
                        this.$Modal.error({
                          title: "非保存状态不可删除！",
                          okText: '确认',
                        })
                        return
                      }
                      this.$Modal.confirm({
                        title: "确定删除吗?删除后不可恢复！",
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                          this.pagerData.data.splice(params.index, 1);
                          this.$http.get(api.DELETE_TENDER_BY_ID + "/" + params.row.id).then(res => {
                            Message.message(res.data);
                            this.search()
                          })
                        },
                      });

                    }
                  }
                })
              ]);
            }
          }],
        formItem: {
          code: '',
          title: '',
          status: '',
          projectName: ''
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
        let path = "?code=" + this.formItem.code +
          "&title=" + this.formItem.title +
          "&projectName=" + this.formItem.projectName +
          "&status=" + this.formItem.status +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.TENDER_LIST + path).then((res) => {
          this.pagerData.data = res.data.data.records;
          this.pagerData.page.totalCount = res.data.data.total;
          this.pagerData.page.pageCount = res.data.data.pages;
        })
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
        this.$router.push({
          path: "tender-publish/card/" + "add",
        })
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
<style>
  .tenderlist-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .tenderopenlist-page {
    padding-top: 5px;
    float: right;
  }

  .btn-title {
    margin-right: 1em;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
