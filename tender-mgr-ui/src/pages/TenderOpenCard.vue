<template>
  <Card icon="log-in" class="tender-card">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <BackTop></BackTop>
    <h3 slot="title" style="font-size: 20px" color="warning">
      待选供应商列表
    </h3>
    <div style="text-align: right;padding-bottom: 10px">
      <Button type="success" v-if="isSave" @click="handleSubmit('')">保存</Button>
      <Button type="primary" v-if="isPublish" @click="publish('')">发布</Button>
      <Button type="success" v-if="isTj" @click="submitApprove('')">提交审核</Button>
      <Button type="primary" v-if="isApprove" @click="approve('')">定标评定</Button>
      <Button type="primary" v-if="isEdit" @click="edit('')">修改</Button>
      <Button type="error" v-if="isDiscard" @click="discard('')">流标</Button>
      <Button @click="returnList('')" style="margin-left: 8px">返回</Button>
    </div>
    <Form ref="formValidate" :model="formValidate" :label-width="90" label-position="right" class="form_list">
      <Row>
        <Col span="7">
          <FormItem label="招标编号" prop="code">
            <Input v-model="formValidate.code" placeholder="招标编号" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="16" offset="1">
          <FormItem label="招标标题" prop="title">
            <Input v-model="formValidate.title" placeholder="招标标题" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="招标项目编码" prop="projectCode">
            <Input v-model="formValidate.projectCode" placeholder="招标项目编码" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="16" offset="1">
          <FormItem label="招标项目名称" prop="projectName">
            <Input v-model="formValidate.projectName" placeholder="招标项目名称" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="招标状态" style="text-align: left">
            <Tag :color="openColor" style="text-align: left">{{openStatus}}</Tag>
          </FormItem>
        </Col>
        <Col span="16" offset="1">
          <FormItem label="审批状态" style="text-align: left">
            <Tag :color="openSpColor" style="text-align: left">{{openSpStatus}}</Tag>
          </FormItem>
        </Col>
      </Row>
      <!--<FormItem label="报名日期">-->
      <!--<Row>-->
      <!--<Col span="4" style="text-align: left">-->
      <!--<FormItem prop="startDateEnroll">-->
      <!--<DatePicker type="date" placeholder="开始时间"-->
      <!--v-model="formValidate.startDateEnroll" :readonly="true"></DatePicker>-->
      <!--</FormItem>-->
      <!--</Col>-->
      <!--<Col span="1">-</Col>-->
      <!--<Col span="4" style="text-align: left">-->
      <!--<FormItem prop="endDateEnroll">-->
      <!--&lt;!&ndash;:options="endDateEnroll"&ndash;&gt;-->
      <!--<DatePicker type="date" placeholder="结束时间"-->
      <!--v-model="formValidate.endDateEnroll" :readonly="true"></DatePicker>-->
      <!--</FormItem>-->
      <!--</Col>-->
      <!--</Row>-->
      <!--</FormItem>-->
      <!--<FormItem label="答疑日期">-->
      <!--<Row>-->
      <!--<Col span="4" style="text-align: left">-->
      <!--<FormItem prop="startDateAnswer">-->
      <!--<DatePicker type="date" placeholder="开始时间"-->
      <!--v-model="formValidate.startDateAnswer" :readonly="true"></DatePicker>-->
      <!--</FormItem>-->
      <!--</Col>-->
      <!--<Col span="1">-</Col>-->
      <!--<Col span="4" style="text-align: left">-->
      <!--<FormItem prop="endDateAnswer">-->
      <!--<DatePicker type="date" placeholder="结束时间"-->
      <!--v-model="formValidate.endDateAnswer" :readonly="true"></DatePicker>-->
      <!--</FormItem>-->
      <!--</Col>-->
      <!--</Row>-->
      <!--</FormItem>-->

      <!--<FormItem label="投标日期">-->
      <!--<Row>-->
      <!--<Col span="4" style="text-align: left">-->
      <!--<FormItem prop="startDateTender">-->
      <!--<DatePicker type="date" placeholder="开始时间"-->
      <!--v-model="formValidate.startDateTender" :readonly="true"></DatePicker>-->
      <!--</FormItem>-->
      <!--</Col>-->
      <!--<Col span="1">-</Col>-->
      <!--<Col span="4" style="text-align: left">-->
      <!--<FormItem prop="endDateTender">-->
      <!--<DatePicker type="date" format="yyyy-MM-dd" placeholder="结束时间"-->
      <!--v-model="formValidate.endDateTender" :readonly="true"></DatePicker>-->
      <!--</FormItem>-->
      <!--</Col>-->
      <!--</Row>-->
      <!--</FormItem>-->
      <Row>
        <Col span="24">
          <FormItem label="招标类别" prop="typ" style="text-align: left" onclick="return false">
            <RadioGroup v-model="radiobox">
              <Radio :label="key" v-for="(value, key) in tenderTypes" :key="key">{{value}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="类别子类" prop="typ" style="text-align: left" onclick="return false">
            <CheckboxGroup v-model="checkbox">
              <Checkbox :label="key" v-for="(value, key) in tenderSubTypes" :key="key">{{value}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
      </Row>
      <!--<div style="font-size: 16px;padding-bottom: 5px;background-color: azure;text-align: left">-->
      <!--<p  class="aaa">-->
      <!--<Button type="primary" style="font-size: 1.1em;">系统推荐中标供应商为：北京绿丰建筑劳务工程有限公司</Button>-->
      <!--</p>-->
      <!--</div>-->
    </Form>
    <Row :gutter="32" style="margin-top: 10px;">
      <Col span="3" style="text-align: right">报名日期:</Col>
      <Col span="5" style="text-align: left">{{formValidate.startDateEnroll}} 至 {{formValidate.endDateEnroll}}</Col>
      <Col span="3" style="text-align: right">答疑日期：</Col>
      <Col span="5" style="text-align: left">{{formValidate.startDateAnswer}} 至 {{formValidate.endDateAnswer}}</Col>
      <Col span="3" style="text-align: right">投标日期：</Col>
      <Col span="5" style="text-align: left">{{formValidate.startDateTender}} 至 {{formValidate.endDateTender}}</Col>
    </Row>
    <divider/>
    <div style="width: 99%;margin-bottom: 16px">
      <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data"
             class=""></Table>
    </div>
    <!--<div class="tenderlist-page">-->
    <!--<Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"-->
    <!--@on-page-size-change="onPageSizeChange"-->
    <!--@on-change="changePage" size="small" show-elevator show-sizer show-total/>-->
    <!--</div>-->
    <Modal v-model="modal2" title="流标原因" style="text-align: center" width="60%">
      <Form ref="achievement" :model="achievement" :rules="ruleValidate2">
        <FormItem prop="reason" class="form-item-register">
          <Input v-model="achievement.reason" type="textarea" :autosize="{minRows: 4,maxRows: 25}"
                 placeholder="流标原因（必填）"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="ok2('achievement')">确定</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'

  export default {
    name: "TenderOpenCard",
    data() {
      return {
        tenderId: 0,
        spinShow: false,
        loading: false,
        isDownload: false,
        modal2: false,
        flag: true,
        isApprove: false,
        isPublish: false,
        isSave: false,
        isTj: false,
        isEdit: false,
        isDiscard: false,
        discardCause: {},
        openColor: '',
        openStatus: '',
        openSpColor: '',
        openSpStatus: '',
        radiobox: '',
        checkbox: [],
        tenderTypes: [],
        tenderSubTypes: [],
        achievement: {
          reason: '',
        },
        formValidate: {
          title: '',
          code: '',
          status: '',
          projectName: '',
          startDate: '',
          endDate: '',
        },
        ruleValidate2: {
          reason: [
            {required: true, message: '流标原因不能为空！', trigger: 'blur'}
          ]
        },
        submitDatas: [],
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
        listcolumns: [
          {
            type: 'index',
            title: '序号',
            width: 65,
            align: 'center'
          },
          {
            title: '供应商名称',
            key: 'companyName'
          },
          {
            title: '投标联系人',
            key: 'contact',
            width: 110,
          },
          {
            title: '联系人电话',
            key: 'contactPhone',
            width: 130,
          },
          {
            title: '投标金额',
            key: 'amount',
            width: 140,
            render: (h, params) => {
              let tbamount = '';
              if (params.row.amount == null || params.row.amount == "") {
                tbamount = null
              } else {
                tbamount = `￥ ${params.row.amount}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }
              return h('div', tbamount);
            }
          },
          {
            title: '投标文件下载',
            key: 'action',
            width: 125,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    color: '#1296db',
                    cursor: 'pointer',
                    marginRight: '5px',
                  },
                  domProps: {
                    innerHTML: "<i style='font-size: 28px' class='iconfont icon-yunxiazai'></i>",
                    title: "点击下载"
                  },
                  on: {
                    click: () => {
                      const row = params.row;
                      if (!row.files) {
                        utils.message({status: 201, msg: "该标书尚未上传投标文件！"})
                        return
                      }
                      this.downloadTbFile(row.files, row.companyName + "/" + this.formValidate.title + "的投标文件.zip");
                    }
                  }
                }, '点击下载'),
              ]);
            }
          },
          // {
          //   title: '已交保证金',
          //   key: 'bond',
          //   width: 140,
          //   render: (h, params) => {
          //     let bzj = '';
          //     if (params.row.bond == null || params.row.bond == "" || params.row.bond == 0) {
          //       bzj = "未交"
          //     } else {
          //       bzj = `￥ ${params.row.bond}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          //     }
          //     return h('div', bzj);
          //   }
          // },
          {
            title: '定标(是否中标)',
            key: 'downLoad',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                // h('Button', {
                //   props: {
                //     type: 'primary',
                //     size: 'small'
                //   },
                //   style: {
                //     marginRight: '5px'
                //   },
                //   on: {
                //     click: () => {
                //       this.$http.get(api.GET_SUPPLIER_BY_ID + "/" + params.row.tenderId).then(res => {
                //         // this.supplier = res.data.data[0];
                //       })
                //     }
                //   }
                // }, '定标'),
                h('i-switch', { //数据库1是待开标，2：已定标，3：流标
                  props: {
                    type: 'primary',
                    size: 'large',
                    value: params.row.bidStatus === 2,  //控制开关的打开或关闭状态，官网文档属性是value
                    disabled: this.flag,
                  },
                  scopedSlots: {
                    open: () => h('span', '中标'),
                    close: () => h('span', '未中')
                  },
                  on: {
                    'on-change': (value) => {
                      if (value) {
                        params.row.bidStatus = 2
                        params.row.status = 3
                      } else {
                        params.row.bidStatus = 3
                        params.row.status = 4
                      }
                      this.submitDatas[params.index] = {
                        id: params.row.id,
                        tenderId: params.row.tenderId,
                        bidStatus: params.row.bidStatus,
                        status: params.row.status
                      }
                    }
                  }
                })
              ]);
            }
          }
        ],
      }
    },
    created() {
      this.tenderId = this.$route.params.id
      this.getData(this.tenderId)
      this.getData1(this.tenderId)
      this.getTypeDictInfo();//加载业务类型
    },
    methods: {
      getData(tenderId) {
        this.$http.get(api.OPEN_TENDER_ID + "/" + this.tenderId).then(res => {
          let result = res.data.data;
          this.formValidate = result;
          //复选框
          this.radiobox = result.typ;
          this.checkbox = result.subTyp.split(",");

          this.openStatus = this.$store.state.tenderStatus[result.status];
          this.openColor = this.$store.state.tenderStatusColors[result.status];
          this.openSpStatus = this.$store.state.tenderOpenStatus[result.approveOpenStatus];
          this.openSpColor = this.$store.state.tenderOpenStatusColors[result.approveOpenStatus];

          if (result.status == 6 && (result.approveOpenStatus == 0 || result.approveOpenStatus == 3)) {
            this.isApprove = true,
              this.isDiscard = true
          }
          if (result.status == 6 && result.approveOpenStatus == 2) {
            this.isPublish = true;
            this.isDiscard = true;
            this.isEdit = true
          }
          if (result.status == 7) {
            this.isDiscard = true
          }

          //审批时不显示按钮
          if (this.$route.query.component == "shenpi") {
            this.isSave = false,
              this.isPublish = false,
              this.isTj = false,
              this.isApprove = false,
              this.isEdit = false,
              this.isDiscard = false
          }
          //子类
          let path = "?typ=" + result.typ +
            "&subTyp=" + result.subTyp;
          this.$http.get(api.SUB_TYPE_CLASS + path).then(res => {
            if (res.data.status !== 200) {
              return;
            }
            let dictData1 = res.data.data;
            let data1 = {};
            dictData1.forEach((o) => {
              data1[o.type + '-' + o.id] = o.className;
            });
            this.tenderSubTypes = data1;
          })
        })
      },
      getData1(tenderId) {
        this.$http.get(api.OPEN_TENDER_BY_ID + "/" + tenderId).then(res => {
          this.pagerData.data = res.data.data;
          let flag9 = true;
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].bidStatus != 1) {
              flag9 = false;
              break;
            }
          }
          if (flag9 == false && (this.approveOpenStatus == 0 || this.approveOpenStatus == 3)) {
            this.isApprove = false;
            this.isTj = true;
          }
          // this.pagerData.page.totalCount = res.data.data.total;
          // this.pagerData.page.pageCount = res.data.data.pages;
        })
      },
      // onPageSizeChange(newSize) {
      //   this.pagerData.page.pageCurrent = 1;
      //   this.pagerData.page.pageSize = newSize;
      //   this.getData();
      // },
      // changePage(newCurrent) {
      //   this.pagerData.page.pageCurrent = newCurrent;
      //   this.getData();
      // },
      //业务类型
      getTypeDictInfo() {
        this.$http.get(api.TENDER_DICT_TYPE).then(res => {
            if (res.data.status !== 200) {
              return;
            }
            let dictData = res.data.data;
            let data = {};
            dictData.forEach((o) => {
              data[o.code] = o.name;
            });
            this.tenderTypes = data;
          }
        )
      },
      //定标评定
      approve() {
        this.isApprove = false,
          this.isSave = true,
          this.isDiscard = false,
          this.flag = false
      },
      edit() {
        this.isEdit = false,
          this.isApprove = false,
          this.isPublish = false,
          this.isSave = true,
          this.isDiscard = false,
          this.flag = false
      },
      handleSubmit() {//确定
        let data1 = this.pagerData.data;
        let submitDatas = this.submitDatas;
        let count = 0;
        if (submitDatas.length == 0) {
          // ("本次操作未进行更改！")
          this.$Modal.warning({
            title: "本次操作未进行更改！",
            okText: '确认',
          });
          return;
        }
        let submitDatas2 = [];
        if (data1 && data1.length != 0) {
          data1.forEach(function (value, index) {
            submitDatas2.push(submitDatas[index] || {
              id: value.id,
              tenderId: value.tenderId,
              bidStatus: value.bidStatus,
              status: value.status,
            })
            if (submitDatas2[index].bidStatus == 2) {
              submitDatas2[index].status = 3
              count++;
            }
            if (submitDatas2[index].bidStatus == 1) {
              submitDatas2[index].bidStatus = 3
              submitDatas2[index].status = 4
            }
          });
        }
        if (count == 0) {
          this.$Modal.warning({
            title: "本次操作未有供应商中标！",
            okText: '确认',
          });
          return;
        }
        if (!submitDatas2 && submitDatas2.length == 0) {
          return;
        }
        this.$Modal.confirm({
          title: "确定该供应商中标吗?",
          okText: '确认',
          width: '35px',
          scrollable: true,
          cancelText: '取消',
          onOk: () => {
            this.spinShow = true;
            this.$http.post(api.OPEN_TENDER_EDIT, submitDatas2).then(res => {
              if (res.data.status == 200) {
                Message.message(res.data);
                this.flag = true,
                  this.isSave = false,
                  this.isApprove = false,
                  this.isTj = true,
                  this.isDiscard = true,
                  this.getData1(this.tenderId)
              } else {
                this.$Message.error('操作失败!');
              }
              this.spinShow = false;
            })
          }
        })

      },
      submitApprove() {
        //提交审核
        this.$Modal.confirm({
          title: "确定提交审核吗?",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            let submitData = {
              tenderId: this.tenderId,
              projectId: this.formValidate.projectId
            };
            this.spinShow = true;
            this.$http.post(api.OPEN_TENDER_APPROVE, submitData).then(res => {
              Message.message(res.data);
              this.isTj = false;
              if (res.data.status === 200) {
                this.getData(this.tenderId)
              } else {
              }
              this.spinShow = false;
            })
          },
        });

      },
      //发布标书
      publish() {
        this.$Modal.confirm({
          title: "确定发布开标结果吗?该操作将向投标供应商发送短信及邮件！",
          width: 40,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.spinShow = true;
            this.$http.get(api.OPEN_TENDER_PUBLISH + this.tenderId).then(res => {
              if (res.data.status == 200) {
                Message.message(res.data);
                this.isPublish = false;
                this.isEdit = false;
                // this.isDiscard = true;
              } else {
                this.$Message.error('发布失败!');
              }
              this.spinShow = false;
            })
          },
        });
      },
      discard() {
        this.$Modal.confirm({
          title: "确认该标书进行流标操作吗?",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.modal2 = true;
          },
        });
      },
      ok2(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.discardCause.id = this.tenderId;
            this.discardCause.reason = this.achievement.reason;
            this.spinShow = true;
            this.$http.post(api.OPEN_TENDER_DISCARD, this.discardCause).then(res => {
              if (res.data.status == 200) {
                this.modal2 = false;
                Message.message(res.data);
                this.flag = true,
                  this.isSave = false,
                  this.isApprove = false,
                  this.isDiscard = false,
                  this.getData1(this.tenderId)
              } else {
                this.$Message.error('操作失败!');
              }
              this.spinShow = false;
            })
          }
        })
      },
      downloadTbFile(fileId, fileName) {
        this.isDownload = true;
        this.$http({
          method: 'post',
          url: api.TB_DOWNLOAD_FILE,
          data: {
            files: fileId
          },
          responseType: 'blob'
        }).then(response => {
          //下载失败的status为200 ，成功为201
          if (response.status == 200) {
            utils.message({status: 202, msg: "下载失败！"})
            return;
          }
          const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
          const aEle = document.createElement('a');     // 创建a标签
          const href = window.URL.createObjectURL(blob);       // 创建下载的链接
          aEle.href = href;
          aEle.download = fileName;  // 下载后文件名
          document.body.appendChild(aEle);
          aEle.click();     // 点击下载
          document.body.removeChild(aEle); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放掉blob对象
          this.isDownload = false;
        }).catch((error) => {
          this.isDownload = false;
        })
      },
      returnList() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped>
  .tender-card {
    padding: 16px;
    margin: 0px auto;
    max-width: 96%;
    text-align: center;
    background-color: #ffffff;
  }

  .tenderlist-page {
    padding-top: 5px;
    float: right
  }

  .aaa {
    margin-bottom: 1em;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
