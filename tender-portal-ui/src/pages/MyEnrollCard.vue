<template>
  <div class="tender-bg">

    <Modal v-model="modal12" draggable scrollable title="温馨提示">
      {{enrollMsg}}
    </Modal>
    <Card icon="log-in" class="tender-card">
      <h2 slot="title">
        {{tender.title}}
      </h2>
      <span href="#" slot="extra" class="tender-code">
        招标编号：{{tender.code}}
      </span>
      <div style="text-align:center">
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">招标项目名称：</Col>
          <Col span="13" style="text-align: left">{{tender.projectName}}</Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">招标项目编码：</Col>
          <Col span="13" style="text-align: left">{{tender.projectCode}}</Col>
        </Row>
        <Divider/>

        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">报名日期：</Col>
          <Col span="8" style="text-align: left">{{tender.startDateEnroll}} 至 {{tender.endDateEnroll}}</Col>
          <Col span="4" class="info-title">答疑日期：</Col>
          <Col span="8" style="text-align: left">{{tender.startDateAnswer}} 至 {{tender.endDateAnswer}}</Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">投标日期：</Col>
          <Col span="8" style="text-align: left">{{tender.startDateTender}} 至 {{tender.endDateTender}}</Col>
          <Col span="4" class="info-title">招标状态：</Col>
          <Col span="8" style="text-align: left">
            <Tag color="success">{{tenderStatus[tender.status]}}</Tag>
          </Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">招标类型：</Col>
          <Col span="20" style="text-align: left">
            <CheckboxGroup v-model="checkbox" onclick="return false">
              <Checkbox :label="key" v-for="(value, key) in tenderTypes" :key="key">{{value}}</Checkbox>
            </CheckboxGroup>
          </Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">招标资质：</Col>
          <Col span="20" style="text-align: left">
            <Select v-model="tender.qualification" style="text-align: left" filterable multiple :disabled="true">
              <Option v-for="item in qualificationList" :value="item.id" :key="item.id">{{ item.zzName }}</Option>
            </Select>
          </Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">招标说明：</Col>
          <Col span="20" style="text-align: left">
            <Input v-model="tender.description" type="textarea" :autosize="{minRows: 2,maxRows: 15}" :readonly="true"></Input>
          </Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">招标文件：</Col>
          <Col span="13" style="text-align: left">
            <Button type="primary" style="padding: 1em" @click="downloadTenderFile" :loading="isDownload">
              点击下载，{{tender.title}}.zip
            </Button>
          </Col>
        </Row>
        <Divider/>

        <!--1.招标中状态为5 ， 2 stage==1 则为报名成功阶段，可以投标-->
        <Card v-if="tender.status ==5 && stage == 1">
          <!-- 拥有报名审核完毕之后 ，1.status==3  2.拥有投标资格-->
          <h3 slot="title" color="warning">
            投 标
          </h3>
          <Row>
            <Col span="20" offset="4">
              <div class="tender-upload">
                <Upload
                  multiple
                  type="drag"
                  action=""
                  :before-upload="handleUpload" :disabled="file!=''">
                  <div style="padding: 16px">
                    <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                    <p>投标文件上传 .zip文件</p>
                  </div>
                </Upload>
                <div v-if="uploadStatus!='1'">上传文件: {{ file.name }}
                  <Button type="text" @click="upload" :loading="uploadStatus==='2'">
                    {{ uploadStatusObj[uploadStatus] }}
                  </Button>
                  <Icon type="md-close" style="color: red" size="20" @click="delUpFile"
                        v-if="uploadStatus==3||uploadStatus ==4"/>
                  <!--<Button type="error" @click="delUpFile" v-if="uploadStatus==3||uploadStatus ==4">删除上传</Button>-->
                  <!--<Icon type="md-checkmark" v-if ="uploadStatus=='3'"/>-->
                  <!---->
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span="20" offset="4">
              <div style="text-align: left;margin-top: 16px">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                  <FormItem prop="amount">
                    <Poptip trigger="focus">
                      <Input v-model="formInline.amount" placeholder="投标金额（元）">
                      <Icon type="logo-yen" slot="prepend"/>
                      <span slot="append">元</span>
                      </Input>
                      <div slot="content">{{ formatNumber }}</div>
                    </Poptip>
                  </FormItem>
                  <FormItem prop="contact">
                    <Input type="text" v-model="formInline.contact" placeholder="联系人">
                    <Icon type="md-person" slot="prepend"/>
                    </Input>
                  </FormItem>
                  <FormItem prop="contactPhone">
                    <Input type="text" v-model="formInline.contactPhone" placeholder="联系方式">
                    <Icon type="ios-call" slot="prepend"/>
                    </Input>
                  </FormItem>
                </Form>
              </div>
            </Col>
          </Row>

          <div style="margin-top: 16px">
            <Button type="success" style="padding: 16px 32px;" @click="submitTender('formInline')">我要投标</Button>
            <!--<Button type="info" ghost style="margin-left: 16px" @click="cancel">取消</Button>-->
          </div>
        </Card>
      </div>
      <div style="margin-top: 16px">
        <Button type="success" style="padding: 16px 32px;" v-if="stage==2">已投标</Button>
      </div>
    </Card>

  </div>
</template>
<script>
  import * as api from '../api/api'
  import * as utils from '../common/utils';

  export default {
    data() {
      return {
        typId:'',
        formInline: {
          amount: null,
          contact: null,
          contactPhone: null,
          files: null,
          tenderId: null
        },
        qualificationList: [],
        checkbox:[],
        tenderTypes:[],
        //显示金额
        modal12: false,
        isShowDetails: false,
        tenderId: '',
        userTenderStatus: '',
        tenderStatus: '',
        //阶段1位报名阶段。2为已投标阶段
        stage: 2,
        //报名信息
        enrollMsg: '',
        fileName: '',
        //是否正在下载
        isDownload: false,
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
        tender: {
          id: '',
          code: '',
          title: '',
          projectCode: '',
          projectName: '',
          startDateEnroll: '',
          endDateEnroll: '',
          startDateAnswer: '',
          endDateAnswer: '',
          startDateTender: '',
          endDateTender: '',
          description: '',
          status: '',
          files: ''
        },
        ruleInline: {
          amount: [
            {required: true, message: '请输入金额', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系人!', trigger: 'blur'},
          ],
          contactPhone: [
            {required: true,type:'number', message: '请填写正确手机号,该手机号将作为定标短信通知唯一手机号!', trigger: 'blur',transform(value){
                let tel_regexp=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if(!tel_regexp.test(value)){
                  return false;
                }else{
                  return Number(value)
                }
              }},
          ]
        }
      }
    }
    ,
    created() {
      this.tenderId = this.$route.params.id;
      this.userTenderStatus = this.$route.params.status;
      this.$http.get(api.TENDER_INFO_ID + this.tenderId).then(res => {
        this.tender = res.data.data;
        this.tender.qualification = this.tender.qualification.split(",");
        this.checkbox = this.tender.subTyp.split(",");
        this.fileName = this.tender.title + ".zip";
        this.formInline.tenderId = this.tender.id;
        this.typId = this.tender.subTyp;
        this.getTypeClass(this.typId);
      });
      this.$http.get(api.TENDER_BID_STATUS + this.tenderId).then(res => {
        if (res.data.status === 200) {
          //是否显示详情
          this.stage = res.data.data;
        }
      });
      this.tenderStatus = utils.getData("tenderStatus");
      //投标上传文件URL
      this.enrollUploadUrl = api.MENROLL_UPLOAD;

      // 资质回显
      this.$http.get(api.QUALIFICATION).then(res => {
        if (res.data.status !== 200) {
          return;
        }
        this.qualificationList = res.data.data;
      })
    },
    methods: {
      //大小类型回显
      getTypeClass(tpyId){
        let path = "?subTyp=" + tpyId
        this.$http.get(api.TYPE_CLASS+path).then(res => {
          if (res.data.status !== 200) {
            return;
          }
          let dictData = res.data.data;
          let data = {};
          dictData.forEach((o) => {
            data[o.type+'-'+o.id] = o.className;
          });
          this.tenderTypes = data;
        })
      },
      //投标
      submitTender(name) {
        if(this.tender.status!=5){
          this.$Modal.warning({
            title: "该阶段未到投标期，投标失败！",
            okText: '确认',
          })
          return
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$http.post(api.MENROLL_TENDER, this.formInline).then(res => {
              if (res.data.status === 200) {
                //投标成功
                this.enrollMsg = "恭喜您投标成功！"
                //刷新
                this.$http.get(api.TENDER_INFO_ID + this.tenderId).then(res => {
                  this.tender = res.data.data;
                  this.tender.qualification = this.tender.qualification.split(",");
                  this.checkbox = this.tender.subTyp.split(",");
                  this.fileName = this.tender.title + ".zip";
                  this.formInline.tenderId = this.tender.id;
                  this.typId = this.tender.subTyp;
                  this.getTypeClass(this.typId);
                });
                this.$http.get(api.TENDER_BID_STATUS + this.tenderId).then(res => {
                  if (res.data.status === 200) {
                    //是否显示详情
                    this.stage = res.data.data;
                  }
                });
                this.tenderStatus = utils.getData("tenderStatus");

                // 资质回显
                this.$http.get(api.QUALIFICATION).then(res => {
                  if (res.data.status !== 200) {
                    return;
                  }
                  this.qualificationList = res.data.data;
                })
              } else {
                //投标失败
                this.enrollMsg = res.data.msg;
              }
              this.modal12 = true;
            });
          } else {
            this.$Message.error('请输入必填信息！');
          }
        })
      },
      //报名
      toEnroll() {
        this.$http.get(api.TENDER_TO_ENROLL + this.tenderId).then(res => {
          //获取是否有报名资格
          if (res.data.status !== 200) {
            //账户没有资格
            this.enrollMsg = res.data.msg;
          } else {
            //报名成功
            this.enrollMsg = "恭喜您报名成功，请耐心等待工作人员为您审核报名，审核完成后我们将以邮件的方式通知到您！"
          }
          this.modal12 = true;
        });
      },
      //返回
      cancel() {
        this.$router.go(-1)
      },
      test() {
        this.isShowDetails = !this.isShowDetails
      },
      handleUpload(file) {
        this.file = file;
        this.uploadStatus = '5';
        return false;
      },
      upload() {
        this.uploadStatus = '2';
        let formData = new FormData();
        formData.append("file", this.file);
        this.$http.post(api.MENROLL_UPLOAD, formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        }).then(res => {
          if (res.data.status == 200) {
            this.formInline.files = res.data.data;
            this.uploadStatus = '3'
          } else {
            this.uploadStatus = '4'
          }
          // this.$Message.success('Success')
        }).catch((error) => {
          this.uploadStatus = '4'
        });
      },
      //下载标书文件
      downloadTenderFile() {
        this.isDownload = true;
        this.$http({
          method: 'post',
          url: api.MENROLL_DOWNLOAD,
          data: {
            id: this.tender.id,
            fileName: this.fileName,
            fileId: this.tender.files
          },
          responseType: 'blob'
        }).then(response => {
          //下载失败的status为200 ，成功为201
          if (response.status == 200) {
            utils.message({status:202 , msg: "下载失败！"})
            return;
          }
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
      delUpFile() {
        this.file = null;
        this.tender.files = null;
        this.uploadStatus = '1';
      },
      formatAmount() {
        this.formInline.amount = this.amountShow;
        this.amountShow = utils.numFormat(this.amountShow);
      }
    },
    computed: {
      formatNumber() {
        if (this.formInline.amount === '') return '请确认金额';
        return utils.numFormat(this.formInline.amount);
      }
    }
  }
</script>

<style scoped>
  .tender-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .tender-card {
    padding: 16px;
    margin: 0px auto;
    max-width: 80%;
    text-align: center;
    background-color: #ffffff;
  }

  .tender-row {
    /*line-height: 2em;*/
  }

  .info-title {
    font-size: 1.2em;
    text-align: left;
    font-weight: bold;

  }

  .tender-upload {
    text-align: left;
    width: 50%;
    padding-top: 16px;
  }

  .tender-code {
    font-size: 0.8em;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  .demo-spin-col {
    height: 3em;
    position: relative;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
