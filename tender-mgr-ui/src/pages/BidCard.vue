<template>
  <Card icon="log-in" class="answer-card">
    <p slot="title" style="font-size: 20px">
      投标供应商
    </p>
    <div style="text-align: right">
      <Button type="success" v-if="isSave" @click="handleSubmit('')">确认</Button>
      <Button type="primary" v-if="isEdit" @click="approve('')">评审</Button>
      <Button type="warning" v-if="isCancel" @click="cancel('')">取消</Button>
      <Button @click="returnList('')" style="margin-left: 8px">返回</Button>
    </div>
    <Form ref="formValidate" :model="formValidate" :label-width="90" label-position="right" class="form_list">
      <Row>
        <Col span="7">
          <FormItem label="招标编号" prop="code">
            <Input v-model="formValidate.code" placeholder="编号" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="16" offset="1">
          <FormItem label="招标标题" prop="title">
            <Input v-model="formValidate.title" placeholder="标题" :readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="7">
          <FormItem label="项目编码" prop="projectCode">
            <Input v-model="formValidate.projectCode" placeholder="招标项目编号" :readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="16" offset="1">
          <FormItem label="项目名称" prop="projectName">
            <Input v-model="formValidate.projectName" placeholder="招标项目名称" :readonly="true"></Input>
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
    <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data"
           class=""></Table>
  </Card>
</template>

<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'

  export default {
    data() {
      return {
        id: 0,
        tenderId: 0,
        flag: true,
        isSave: false,
        //先隐藏了
        isEdit: false,

        isCancel: false,
        radiobox:'',
        checkbox: [],
        tenderTypes: [],
        tenderSubTypes: [],
        supplier: {},
        loading: false,
        modal1: false,
        submitDatas: [],
        // tenderStatu: '',
        // tenderStatus: {
        //   "1": "保存",
        //   "2": "报名中",
        //   "3": "招标中",
        //   "4": "评标中",
        //   "5": "招标截至",
        //   "6": "已定标",
        //   "7": "流标",
        // },
        formValidate: {
          title: '',
          code: '',
          status: '',
          projectName: '',
          startDate: '',
          endDate: '',
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
            width: 150
          },
          {
            title: '联系人电话',
            key: 'contactPhone',
            align: 'center',
            width: 150
          },
          // {
          //   title: '保证金（元）',
          //   key: 'bond',
          //   align: 'center',
          //   width: 150,
          //   render: (h, params) => {
          //     let bondamount='';
          //     if(params.row.bond==null||params.row.bond==""){
          //       bondamount=null
          //     }else {
          //       bondamount=params.row.bond.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          //     }
          //     if (params.row.$isEdit) {
          //       return h('InputNumber', {
          //         props: {
          //           value: params.row.bond,
          //           formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          //           parser: value => `${value}`.replace(/$s?|(,*)/g, '')
          //         },
          //         style: {
          //           width: '120px',
          //         },
          //         on: {
          //           input: (v) => {
          //             this.submitDatas[params.index] = {
          //               id: params.row.id,
          //               isDone: params.row.isDone,
          //               bond: v
          //             };
          //           }
          //         }
          //       });
          //     } else {
          //       return h('div', bondamount);
          //     }
          //   }
          // },
          // {
          //   title: '状态',
          //   key: 'downLoad',
          //   width: 100,
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('i-switch', { //数据库1是通过，0是未通过
          //         props: {
          //           type: 'primary',
          //           size: 'large',
          //           value: params.row.isDone === 1,  //控制开关的打开或关闭状态，官网文档属性是value
          //           disabled: this.flag
          //         },
          //         scopedSlots: {
          //           open: () => h('span', '已交'),
          //           close: () => h('span', '未交')
          //         },
          //         on: {
          //           'on-change': (value) => {
          //             if (value) {
          //               params.row.isDone = 1;
          //               this.handleEdit(params.row)
          //             } else {
          //               params.row.isDone = 0;
          //               this.handleSave(params.row);
          //               params.row.bond = 0;
          //             }
          //             this.submitDatas[params.index] = {
          //               id: params.row.id,
          //               isDone: params.row.isDone,
          //               bond: params.row.bond
          //             };
          //           }
          //         }
          //       })
          //     ]);
          //   }
          // }
        ],
      }
    },

    created() {
      this.id = this.$route.params.id
      this.tenderId = this.$route.params.id
      this.getData(this.id)
      this.getData1(this.tenderId)
      this.getTypeDictInfo();//加载业务类型
    },
    methods: {
      //查询招标文件详细信息
      getData(id) {
        this.$http.get(api.BID_TENDER_BY_ID + "/" + id).then(res => {
          let result = res.data.data;
          this.formValidate = result
          //复选框
          this.radiobox = result.typ;
          this.checkbox = result.subTyp.split(",");
          // this.tenderStatu = this.tenderStatus[result.status];
          //子类
          let path = "?typ=" + result.typ+
            "&subTyp=" + result.subTyp;
          this.$http.get(api.SUB_TYPE_CLASS + path).then(res => {
            if (res.data.status !== 200) {
              return;
            }
            let dictData1 = res.data.data;
            let data1 = {};
            dictData1.forEach((o) => {
              data1[o.type+'-'+o.id] = o.className;
            });
            this.tenderSubTypes = data1;
          })
        })
      },
      //查询供应商信息
      getData1(tenderId) {
        this.$http.get(api.BID_TENDER_SUPPLIER + "/" + tenderId).then(res => {
          this.pagerData.data = res.data.data.records;
          // this.pagerData.page.totalCount = res.data.data.total;
          // this.pagerData.page.pageCount = res.data.data.pages;
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

      handleEdit(row) {
        this.$set(row, '$isEdit', true)

      },
      handleSave(row) {
        this.$set(row, '$isEdit', false)
      },
      handleSubmit() {//确定
        let data1 = this.pagerData.data;
        let submitDatas = this.submitDatas;
        if (submitDatas.length == 0) {
          // alert("本次操作未进行更改！")
          this.$Modal.warning({
            title:"本次操作未进行更改！",
            okText:'确认',
          });
          return;
        }
        let reg = /^[1-9]\d*$|^0$/;
        for (let i = 0; i < submitDatas.length; i++) {
          if (submitDatas[i].isDone == 1 && (submitDatas[i].bond == null || submitDatas[i].bond == 0)) {
            // alert("第" + (i + 1) + "行数据【已交】状态下保证金必填！");
            this.$Modal.error({
              title:"第" + (i + 1) + "行数据【已交】状态下保证金必填！",
              okText:'确认',
              scrollable:true,
              // style:"{top: '4000020px'}"
            });
            return
          }
          if (!reg.test(submitDatas[i].bond)) {
            // alert("保证金请填写数字格式!")
            this.$Modal.warning({
              title:"保证金请填写数字格式！",
              okText:'确认',
            });
            return
          }
        }
        let submitDatas2 = [];
        if (data1 && data1.length != 0) {
          data1.forEach(function (value, index) {
            submitDatas2.push(submitDatas[index] || {
              id: value.id,
              isDone: value.isDone,
              bond: value.bond
            })
          });
        }
        if (!submitDatas2 && submitDatas2.length == 0) {
          return;
        }
        this.$http.post(api.BID_TENDER_EDIT, submitDatas2).then(res => {
          if (res.data.status == 200) {
            Message.message(res.data);
            this.flag = true,
              this.isSave = false,
              this.isEdit = true,
              this.isCancel = false,
              this.getData1(this.tenderId)
            // this.$Message.success('操作成功!');
          } else {
            this.$Message.error('操作失败!');
          }
        })
      },
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
      approve() {//评审
        this.flag = false,
          this.isSave = true,
          this.isEdit = false,
          this.isCancel = true

      },
      cancel() {//取消
        this.flag = true,
          this.isSave = false,
          this.isEdit = true,
          this.isCancel = false,
          this.getData1(this.tenderId)
      },
      returnList() {//返回
        this.$router.push({
          path: "/bid"
        })
      },
    }
  }
</script>

<style>
  .answer-card {
    padding: 16px;
    margin: 0px auto;
    max-width: 96%;
    text-align: center;
    background-color: #ffffff;
  }

  .form_list {
    margin-top: 10px;
  }

  .tenderlist-page {
    padding-top: 16px;
    float: right
  }

  .enroll-row {
    margin-top: 10px;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
