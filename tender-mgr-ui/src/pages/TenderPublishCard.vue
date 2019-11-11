<template>
  <div class=".tender-publish-bg">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <BackTop></BackTop>
    <Card icon="log-in" class="tender-publish-card">
      <p slot="title">
        招标文件
      </p>
      <div style="text-align: right">
        <Button type="success" v-if="isSave" @click="handleSubmit('formValidate')">保存</Button>
        <Button type="primary" v-if="isEdit" @click="edit('')">修改</Button>
        <Button type="warning" v-if="isCancel" @click="cancel('')">取消</Button>
        <Button type="info" v-if="isSubmit" @click="submitApprove('')">提交</Button>
        <Button type="info" v-if="isPublish" @click="publish('')">发布</Button>
        <Button type="warning" v-if="isRevok" @click="revok('')">撤回</Button>
        <!--<Button type="error" v-if="isDelete">删除</Button>-->
        <Button @click="returnList('')" style="margin-left: 8px">返回</Button>
      </div>
      <div class="tender-publish-form">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="left">

          <Row>
            <Col span="16">
              <FormItem label="招标标题" prop="title">
                <Input v-model="formValidate.title" placeholder="标题" :readonly="flag"></Input>
              </FormItem>
            </Col>
            <Col span="7" offset="1">
              <FormItem label="招标编号" prop="code">
                <Input v-model="formValidate.code" placeholder="编号" disabled></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="16">
              <FormItem label="招标项目名称" prop="projectId">
                <Select v-model="formValidate.projectId" filterable :disabled="flag">
                  <Option v-for="item in projectList" @click.native="getProjectSelect(item)" :value="item.id"
                          :key="item.id">{{ item.name }}
                  </Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="7" offset="1">
              <FormItem label="招标项目编码" prop="projectCode">
                <Input v-model="formValidate.projectCode" placeholder="招标项目编号" disabled></Input>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="16">
              <FormItem label="标书金额范围（用于审批）" prop="amtScope" style="text-align: left" :onclick="flag1">
                <Select v-model="formValidate.amtScope" placeholder="请选择" filterable :disabled="flag">
                  <
                  <Option value="1">100万以下</Option>
                  <
                  <Option value="2">100万-200万</Option>
                  <
                  <Option value="3">200万以上</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="7" offset="1">
              <FormItem label="标书状态" style="text-align: left">
                <Tag :color="tenderColor" style="text-align: left">{{tenderStatu}}</Tag>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span="16">
              <FormItem label="业务类型" prop="typ" style="text-align: left" :onclick="flag1">
                <RadioGroup v-model="radiobox" @on-change="typChange">
                  <Radio :label="key" v-for="(value, key) in tenderTypes" :key="key">{{value}}</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="7" offset="1">
              <FormItem label="发布审核状态" style="text-align: left">
                <Tag :color="scolor" style="text-align: left">{{approStatus[formValidate.approvePublishStatus]}}</Tag>
              </FormItem>
            </Col>
          </Row>

          <FormItem label="类型详情" prop="subTyp" style="text-align: left" :onclick="flag1">
            <CheckboxGroup v-model="checkbox" @on-change="subtypChange">
              <Checkbox :label="key" v-for="(value, key) in tenderSubTypes" :key="key">{{value}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="企业资质" prop="qualification">
            <Select v-model="formValidate.qualification" style="text-align: left" @on-open-change="zzChange" filterable
                    multiple
                    :disabled="flag">
              <Option v-for="item in qualificationList" :value="item.id" :key="item.id">{{ item.zzName }}</Option>
            </Select>
          </FormItem>

          <FormItem label="报名日期">
            <Row>
              <Col span="4" style="text-align: left">
                <FormItem prop="startDateEnroll1">
                  <DatePicker type="date" placeholder="开始时间" :options="startEnrollOptions"
                              @on-change="startEnrollChange"
                              v-model="formValidate.startDateEnroll1" :readonly="flag"></DatePicker>
                </FormItem>
              </Col>
              <Col span="1">-</Col>
              <Col span="4" style="text-align: left">
                <FormItem prop="endDateEnroll1">
                  <DatePicker type="date" placeholder="结束时间" :options="endEnrollOptions" @on-change="endEnrollChange"
                              v-model="formValidate.endDateEnroll1"
                              :readonly="flag"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="答疑日期">
            <Row>
              <Col span="4" style="text-align: left">
                <FormItem prop="startDateAnswer1">
                  <DatePicker type="date" placeholder="开始时间" :options="startAnswerOptions"
                              @on-change="startAnswerChange"
                              v-model="formValidate.startDateAnswer1" :readonly="flag"></DatePicker>
                </FormItem>
              </Col>
              <Col span="1">-</Col>
              <Col span="4" style="text-align: left">
                <FormItem prop="endDateAnswer1">
                  <DatePicker type="date" placeholder="结束时间" :options="endAnswerOptions" @on-change="endAnswerChange"
                              v-model="formValidate.endDateAnswer1" :readonly="flag"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="投标日期">
            <Row>
              <Col span="4" style="text-align: left">
                <FormItem prop="startDateTender1">
                  <DatePicker type="date" placeholder="开始时间" :options="startTenderOptions"
                              @on-change="startTenderChange"
                              v-model="formValidate.startDateTender1" :readonly="flag"></DatePicker>
                </FormItem>
              </Col>
              <Col span="1">-</Col>
              <Col span="4" style="text-align: left">
                <FormItem prop="endDateTender1">
                  <DatePicker type="date" placeholder="结束时间" :options="endTenderOptions" @on-change="endTenderChange"
                              v-model="formValidate.endDateTender1" :readonly="flag"></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="招标要求" prop="description">
            <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 20}"
                   :readonly="flag"></Input>
          </FormItem>

          <FormItem label="招标文件" v-if="formValidate.files!=null && formValidate.files!=''">

            <Button type="primary" style="float: left" @click="downloadTenderFile" :loading="isDownload" title="点击下载">
              {{formValidate.title}}.zip
            </Button>
            <Icon type="md-close" style="color: red;float: left" size="30" @click="delFile" v-if="editshow==1"/>

          </FormItem>

          <Row v-if="editshow==1">
            <Col span="15" offset="4">
              <div class="tender-upload">
                <Upload
                  multiple
                  type="drag"
                  action=""
                  :before-upload="handleUpload" :disabled="file!=''">
                  <div style="padding: 16px">
                    <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                    <p>招标文件上传 .zip文件</p>
                  </div>
                </Upload>
                <div v-if="uploadStatus!='1'">上传文件: {{ file.name }}
                  <Button type="text" @click="upload" :loading="uploadStatus==='2'">
                    {{ uploadStatusObj[uploadStatus] }}
                  </Button>
                  <Icon type="md-close" style="color: red" size="20" @click="delUpFile"/>
                </div>
              </div>
            </Col>
          </Row>

          <Divider/>
          <Row>
            <Col span="5">
              <FormItem label="创建人">
                <Input v-model="formValidate.creator" placeholder="创建人" :readonly="true"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="创建时间">
                <Input v-model="formValidate.gmtCreate" placeholder="创建时间" :readonly="true"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="发布人">
                <Input v-model="formValidate.publisher" placeholder="发布人" :readonly="true"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="发布时间">
                <Input v-model="formValidate.publishTime" placeholder="发布时间" :readonly="true"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'
  import auth from "../common/auth";

  export default {
    data() {
      return {
        id: 0,
        isDownload:false,
        spinShow:false,
        flag: '',
        flag1: 'return false',
        isSave: false,
        isEdit: false,
        isCancel: false,
        isPublish: false,
        isSubmit: false,
        isRevok: true,
        isDelete: true,
        approvePublishStatus: '',
        tenderStatu: '',
        tenderColor: '',
        scolor: '',
        scolors: {
          "1": "primary",
          "2": "success",
          "3": "error",
          "4": "warning",
        },
        approStatu: '',
        approStatus: {
          "1": "审核中",
          "2": "审核通过",
          "3": "审核不通过",
          "4": "保存",
        },
        tender: {},
        loading: false,
        tenderTypes: [],
        tenderSubTypes: [],
        checkbox: [],
        radiobox: '',
        model12: [],
        typ: '',//业务类型
        subTyp: '',//业务类型子类
        startEnrollOptions: {}, //报名开始日期设置
        endEnrollOptions: {}, //报名结束日期设置
        startAnswerOptions: {}, //答疑开始日期设置
        endAnswerOptions: {}, //答疑结束日期设置
        startTenderOptions: {}, //投标开始日期设置
        endTenderOptions: {}, //投标结束日期设置
        endDateEnroll: '',


        fileName: '',
        //上传URL
        enrollUploadUrl: '',
        //上传状态
        uploadStatusObj: {
          "1": '无文件',
          "2": '正在上传',
          "3": '上传成功',
          "4": '上传失败',
          "5": '确定上传',
        },
        uploadStatus: '1',
        //上传的文件
        file: '',
        fileId: '',
        editshow: 0,//控制附件


        projectList: [],
        qualificationList: [],
        formValidate: {
          title: '',
          code: '',
          amtScope: '',
          projectName: '',
          projectId: '',
          projectCode: '',
          startDateEnroll: '',
          endDateEnroll: '',
          startDateAnswer: '',
          endDateAnswer: '',
          startDateTender: '',
          endDateTender: '',
          description: '',
          creator: '',
          createTime: '',
          qualification: '',

          startDateEnroll1: null,
          endDateEnroll1: null,
          startDateAnswer1: null,
          endDateAnswer1: null,
          startDateTender1: null,
          endDateTender1: null,
        },
        formItem: {
          title: '',
          textarea: ''
        },
        ruleValidate: {
          code: [
            {required: true, message: '招标编号不能为空', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '招标标题不能为空', trigger: 'blur'}
          ],
          amtScope: [
            {required: true, message: '金额范围不能为空', trigger: 'blur'}
          ],
          // projectCode: [
          //   {required: true, message: '项目编号不能为空', trigger: 'blur'}
          // ],
          projectId: [
            {required: true, message: '项目名称不能为空', trigger: 'change'}
          ],
          startDateEnroll1: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],
          endDateEnroll1: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],
          startDateAnswer1: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],
          endDateAnswer1: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],
          startDateTender1: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],
          endDateTender1: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],

          // typ: [
          //   {required: true}
          // ],
          // qualification: [
          //   {required: true, message: '资质不能为空'}
          // ],
        },
      }
    },
    created() {
      this.id = this.$route.params.id;
      let userName = auth.getUsername();
      let userId = auth.getUserid();
      if (this.id == 'add') {
        this.$http.get(api.TENDER_CODE).then(res => {
          this.formValidate.code = res.data.data
        });
        this.isSave = true;
        this.isEdit = false;
        this.isCancel = false;
        this.isPublish = false;
        this.isRevok = false;
        this.flag = false;
        this.flag1 = "return true";
        this.editshow = 1;
        this.formValidate.creator = userName;
        this.formValidate.creatorId = userId;
        this.formValidate.gmtCreate = this.getTime();
      } else {
        if (this.id != null && this.id != "" && this.id != "undefined") {
          this.getData(this.id);
        }
      }
      this.getTypeDictInfo();//加载业务类型
      this.getProject();
      this.getQualificationList();
    },
    methods: {
      getData(id) {
        this.$http.get(api.TENDER_ID + id).then(res => {
          let result = res.data.data;
          this.formValidate = result;
          this.fileName = this.formValidate.title + ".zip";
          this.formValidate.amtScope = result.amtScope.toString();
          this.approvePublishStatus = result.approvePublishStatus;
          this.approStatu = this.approStatus[result.approvePublishStatus];
          this.scolor = this.scolors[result.approvePublishStatus];
          this.tenderStatu = this.$store.state.tenderStatus[result.status];
          this.tenderColor = this.$store.state.tenderStatusColors[result.status];
          this.formValidate.startDateEnroll1 = new Date(result.startDateEnroll);
          this.formValidate.endDateEnroll1 = new Date(result.endDateEnroll);
          this.formValidate.startDateAnswer1 = new Date(result.startDateAnswer);
          this.formValidate.endDateAnswer1 = new Date(result.endDateAnswer);
          this.formValidate.startDateTender1 = new Date(result.startDateTender);
          this.formValidate.endDateTender1 = new Date(result.endDateTender);

          this.radiobox = result.typ;
          if (result.qualification != null && result.qualification != "") {
            this.formValidate.qualification = result.qualification.split(",");
          } else {
            this.formValidate.qualification = [];
          }
          //复选框
          // if (result.typ != null && result.typ != "") {
          this.checkbox = result.subTyp.split(",");
          // } else {
          //   this.checkbox = [];
          // }
          this.typ = result.typ;
          this.subTyp = result.subTyp;
          if (result.approvePublishStatus == 0 || result.approvePublishStatus == 3) {
            this.isSubmit = true;
          }
          if (result.approvePublishStatus != 1) {
            this.isEdit = true;
          }
          if (result.status == 1) {
            this.isPublish = true;
            // this.isSubmit = true;
            this.isRevok = false;
          } else if (result.status == 2) {
            this.isPublish = false;
            this.isRevok = true;
          }
          //审批时不显示按钮
          if (this.$route.query.component == "shenpi") {
            this.isPublish = false,
              this.isRevok = false,
              this.isSave = false,
              this.isEdit = false,
              this.isCancel = false,
              this.isSubmit = false
          }


          // this.typ = result.typ;//赋值 用于企业资质显示
          //根据类型获取企业资质
          // let path = "?typ=" + result.typ;
          // this.$http.get(api.QUALIFICATION + path).then(res => {
          //   if (res.data.status !== 200) {
          //     return;
          //   }
          //   this.qualificationList = res.data.data;
          //   //资质多选反显
          //   this.formValidate.qualification = result.qualification.split(",");
          // })
          // this.typ = result.typ;//赋值 用于业务类型子类显示
          // 根据类型获取类型子类
          let path = "?typ=" + result.typ;
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
      //获取项目名称
      getProject() {
        this.$http.get(api.PROJECT).then(res => {
          this.projectList = res.data.data;
        })
      },

      getProjectSelect(obj) {
        this.formValidate.projectCode = obj.code
        this.formValidate.projectName = obj.name
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
      //打开企业资质
      zzChange() {
        // if (this.typ == null || this.typ == "" || this.typ == "undefined") {
        //   this.$Message.error('请先选择业务类型!');
        //   return;
        // }
        this.qualification = this.formValidate.qualification.toString();
      },
      //业务类型改变时
      typChange() {
        this.typ = this.radiobox
        // let length = arr.length;
        let path = "?typ=" + this.typ;
        //根据类型获取子类
        this.$http.get(api.SUB_TYPE_CLASS + path).then(res => {
          if (res.data.status !== 200) {
            return;
          }
          let dictData = res.data.data;
          let data = {};
          dictData.forEach((o) => {
            data[o.type + '-' + o.id] = o.className;
          });
          this.tenderSubTypes = data;
          this.checkbox = [];
          this.subTyp = '';
        })
      },
      // 业务类型改变时（二级）
      subtypChange(arr) {
        this.subTyp = this.checkbox.toString()
      },

      upload() {
        this.uploadStatus = '2';
        let formData = new FormData();
        formData.append("file", this.file);
        this.$http.post(api.TENDER_UPLOAD, formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.fileId = res.data.data;
            this.uploadStatus = '3'
          } else {
            this.uploadStatus = '4'
            if (res.data.status == 10008) {
              // alert("上传文件类型错误,请上传.zip类型文件！")
              this.$Modal.warning({
                title: "上传文件类型错误,请上传.zip类型文件！",
                okText: '确认',
              });
            }
          }
        }).catch((error) => {
          this.uploadStatus = '4'
        });
      },
      getTime() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      handleSubmit(name) {
        if (this.typ == null || this.typ == "" || this.typ == "undefined") {
          this.$Message.error('业务类型必填!');
          return
        }
        if (this.subTyp == null || this.subTyp == "" || this.subTyp == "undefined") {
          this.$Message.error('业务类型子类必填!');
          return
        }
        // if(this.formValidate.qualification==null || this.formValidate.qualification=="" || this.formValidate.qualification=="undefined"){
        //   alert("企业资质必填！");
        //   return
        // }
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formValidate.typ = this.typ;
            this.formValidate.subTyp = this.subTyp;
            this.formValidate.files = this.fileId;
            if (this.formValidate.endDateEnroll1 < this.formValidate.startDateEnroll1) {
              this.$Message.error('报名结束时间应大于开始时间!');
              return
            }
            if (this.formValidate.endDateAnswer1 < this.formValidate.startDateAnswer1) {
              this.$Message.error('答疑结束时间应大于开始时间!');
              return
            }
            if (this.formValidate.endDateTender1 < this.formValidate.startDateTender1) {
              this.$Message.error('报名结束时间应大于开始时间!');
              return
            }
            if (this.formValidate.endDateEnroll1 >= this.formValidate.startDateTender1) {
              this.$Modal.error({
                title: "投标开始时间应大于报名结束时间！",
                okText: '确认',
              })
              return
            }
            if (this.formValidate.files == null || this.formValidate.files == "") {
              this.$Modal.error({
                title: "请上传招标文件！",
                okText: '确认',
              })
              return
            }
            this.formValidate.startDateEnroll = this.formValidateat(this.formValidate.startDateEnroll1);
            this.formValidate.endDateEnroll = this.formValidateat(this.formValidate.endDateEnroll1);
            this.formValidate.startDateAnswer = this.formValidateat(this.formValidate.startDateAnswer1);
            this.formValidate.endDateAnswer = this.formValidateat(this.formValidate.endDateAnswer1);
            this.formValidate.startDateTender = this.formValidateat(this.formValidate.startDateTender1);
            this.formValidate.endDateTender = this.formValidateat(this.formValidate.endDateTender1);
            this.formValidate.qualification = this.formValidate.qualification.toString();
            this.spinShow=true;
            this.$http.post(api.TENDER_EDIT, this.formValidate).then(res => {
              if (res.data.status == "200") {
                if (res.data.data != null) {
                  this.id = res.data.data;
                  this.$Message.success('保存成功!');
                } else {
                  Message.message(res.data);
                }
                this.flag = true
                this.flag1 = 'return false'
                this.isSave = false
                this.isEdit = true
                this.isCancel = false
                this.editshow = 0;//控制删除附件按钮
                this.getData(this.id)
              } else {
                this.$Message.error('修改失败!');
              }
              this.spinShow=false;
            })
          } else {
            this.$Message.error('操作失败!');
          }
        })
      },
      edit() {
        if (this.approvePublishStatus == 1) {
          this.$Modal.error({
            title: "审核中不可修改！",
            okText: '确认',
          })
          return
        }
        this.flag = false;
        this.flag1 = 'return true';
        this.isSave = true;
        this.isEdit = false;
        this.isSubmit = false;
        this.isPublish = false;
        this.isCancel = true;
        this.editshow = 1;
        this.fileId = this.formValidate.files;
        // this.uploadStatus = 1;
        // this.file = '';
        // this. fileId= '';
      },
      publish() {
        if (this.approvePublishStatus != 2) {
          this.$Modal.error({
            title: "审核通过后方可发布！",
            okText: '确认',
          })
          return
        }
        this.$Modal.confirm({
          title: "确定发布该标书吗？该操作将向所有符合要求的供应商发送短信及邮件！",
          width:45,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.spinShow=true;
            this.$http.get(api.TENDER_PUBLISH + this.id).then(res => {
              if (res.data.status == 200) {
                Message.message(res.data);
                this.isPublish = false;
                this.isRevok = true;
                this.getData(this.id)
              } else {
                this.$Message.error(res.data.msg);
              }
              this.spinShow=false;
            })
          },
        });
      },
      submitApprove() {
        this.$Modal.confirm({
          title: "确定提交审核该标书吗?",
          // content:'删除！',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            let submitData = {
              tenderId: this.id,
              projectId: this.formValidate.projectId
            };
            this.spinShow=true;
            this.$http.post(api.TENDER_SUBMIT, submitData).then(res => {
              Message.message(res.data);
              if (res.data.status === 200) {
                this.isPublish = false;
                this.isRevok = true;
                this.isSubmit = false;
                this.getData(this.id)
              } else {
              }
              this.spinShow=false;
            })
          },
        });
      },
      //撤回标书
      revok() {
        // let tips = confirm("确定撤回该标书吗?")
        this.$Modal.confirm({
          title: "确定撤回该标书吗?",
          // content:'删除！',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.$http.get(api.TENDER_REVOK + this.id).then(res => {
              if (res.data.status == 200) {
                Message.message(res.data);
                this.isPublish = true;
                this.isRevok = false;
                this.getData(this.id)
              } else {
                this.$Message.error('撤回失败!');
              }
            })
          },
        });
      },
      cancel() {
        this.flag = true,
          this.flag1 = 'return false',
          this.isSave = false,
          this.isEdit = true,
          this.isCancel = false,
          this.editshow = 0,
          this.getData(this.id)
      },
      delUpFile() {
        this.file = '';
        // this.fileId = '';
        // this.answer.files = null;
        // this.uploadStatus = '1';
      },
      handleUpload(file) {
        this.file = file;
        this.uploadStatus = '5';
        return false;
      },
      delFile() {
        // let tips = confirm("确认删除吗?删除后不可恢复！")
        //   if (tips == true) {
        this.formValidate.files = '',
          this.file = ''
        // }
      },
      returnList() {
        this.$router.go(-1)
      },
      startEnrollChange: function (e) { //报名设置开始时间
        this.starttime = e;
        this.endEnrollOptions = {
          disabledDate: date => {
            let startTime = this.starttime ? new Date(this.starttime).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
            return date && (date.valueOf() < startTime);
          }
        }
      },
      endEnrollChange: function (e) { //报名设置结束时间
        this.endtime = e;
        let endTime = this.endtime ? new Date(this.endtime).valueOf() : '';
        this.startEnrollOptions = {
          disabledDate(date) {
            return date && date.valueOf() > endTime;
          }
        }
      },
      startAnswerChange: function (e) { //答疑设置开始时间
        this.starttime = e;
        this.endAnswerOptions = {
          disabledDate: date => {
            let startTime = this.starttime ? new Date(this.starttime).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
            return date && (date.valueOf() < startTime);
          }
        }
      },
      endAnswerChange: function (e) { //答疑设置结束时间
        this.endtime = e;
        let endTime = this.endtime ? new Date(this.endtime).valueOf() : '';
        this.startAnswerOptions = {
          disabledDate(date) {
            return date && date.valueOf() > endTime;
          }
        }
      },
      startTenderChange: function (e) { //投标设置开始时间
        this.starttime = e;
        this.endTenderOptions = {
          disabledDate: date => {
            let startTime = this.starttime ? new Date(this.starttime).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
            return date && (date.valueOf() < startTime);
          }
        }
      },
      endTenderChange: function (e) { //投标设置结束时间
        this.endtime = e;
        let endTime = this.endtime ? new Date(this.endtime).valueOf() : '';
        this.startTenderOptions = {
          disabledDate(date) {
            return date && date.valueOf() > endTime;
          }
        }
      },

      getQualificationList() {
        this.$http.get(api.QUALIFICATION).then(res => {
          if (res.data.status !== 200) {
            return;
          }
          this.qualificationList = res.data.data;
        })
      },
      formValidateat(date) {
        let d = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return d;
      },
      //下载标书文件
      downloadTenderFile() {
        this.isDownload = true;
        this.$http({
          method: 'post',
          url: api.TENDER_DOWNLOAD,
          data: {
            id: this.id,
            fileName: this.fileName,
            fileId: this.formValidate.files
          },
          responseType: 'blob'
        }).then(response => {
          const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
          const aEle = document.createElement('a');     // 创建a标签
          const href = window.URL.createObjectURL(blob);       // 创建下载的链接
          aEle.href = href;
          aEle.download = this.fileName;  // 下载后文件名
          document.body.appendChild(aEle);
          aEle.click();     // 点击下载
          document.body.removeChild(aEle); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放掉blob对象
          this.isDownload = false;
        }).catch((error) => {
          this.isDownload = false;
        })
      },
    }
  }
</script>

<style>
  .tender-publish-bg {
    padding: 16px;
    height: 100%;
    /*background-color: #eaeaea;*/
  }

  .tender-publish-card {
    padding: 16px;
    margin: 16px auto;
    text-align: center;
    width: 95%;
    background-color: #ffffff;
  }

  .tender-row {
    margin-top: 10px;
  }

  .tender-publish-form {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .tender-code {
    font-size: 0.8em;
  }

  .tender-upload {
    width: 50%;
    padding-top: 5px;
    margin: 0 auto;

  }
</style>
