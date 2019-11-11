<template>
  <Card icon="log-in" class="tender-card">
    <p slot="title" style="font-size: 20px">
      招标答疑
    </p>
    <div style="text-align: right">
      <Button type="success" v-if="isSave" @click="handleSubmit('')">保存附件</Button>
      <Button type="primary" v-if="isEdit" @click="edit('')">修改</Button>
      <Button type="error" v-if="isDel" @click="delete1('')">删除</Button>
      <Button @click="returnList('')" style="margin-left: 8px">返回</Button>
    </div>
    <div style="text-align:center">
      <Row :gutter="30" class="tender-row">
        <Col span="4" style="text-align: right">招标标题：</Col>
        <Col span="13" style="text-align: left">{{tender.title}}</Col>
      </Row>
      <Row :gutter="30" class="tender-row">
        <Col span="4" style="text-align: right">招标项目名称：</Col>
        <Col span="13" style="text-align: left">{{tender.projectName}}</Col>
      </Row>
      <Row :gutter="30" class="tender-row">
        <Col span="4" style="text-align: right">招标编号：</Col>
        <Col span="7" style="text-align: left">{{tender.code}}</Col>
        <Col span="5" style="text-align: right">招标项目编码：</Col>
        <Col span="7" style="text-align: left">{{tender.projectCode}}</Col>
      </Row>
      <Row :gutter="30" class="tender-row">
        <!--<Col span="4" style="text-align: right">招标类型：</Col>-->
        <!--<Col span="7" style="text-align: left">-->
          <!--<Tag color="success">{{tender.typ}}</Tag>-->
        <!--</Col>-->
        <Col span="4" style="text-align: right">招标状态：</Col>
        <Col span="7" style="text-align: left">
          <Tag :color="scolor">{{tenderStatu}}</Tag>
        </Col>
        <Col span="5" style="text-align: right">报名日期：</Col>
        <Col span="7" style="text-align: left">{{tender.startDateEnroll}} 至 {{tender.endDateEnroll}}</Col>
      </Row>
      <Row :gutter="30" class="tender-row">
        <Col span="4" style="text-align: right">答疑日期：</Col>
        <Col span="7" style="text-align: left">{{tender.startDateAnswer}} 至 {{tender.endDateAnswer}}</Col>
        <Col span="5" style="text-align: right">投标日期：</Col>
        <Col span="7" style="text-align: left">{{tender.startDateTender}} 至 {{tender.endDateTender}}</Col>
      </Row>
      <Row :gutter="30" class="tender-row">
        <Col span="4" style="text-align: right">招标类型：</Col>
        <Col span="20" style="text-align: left">
          <RadioGroup v-model="radiobox" onclick="return false">
            <Radio :label="key" v-for="(value, key) in tenderTypes" :key="key">{{value}}</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row :gutter="30" class="tender-row">
        <Col span="4" style="text-align: right">类型子类：</Col>
        <Col span="20" style="text-align: left">
          <CheckboxGroup v-model="checkbox" onclick="return false">
            <Checkbox :label="key" v-for="(value, key) in tenderSubTypes" :key="key">{{value}}</Checkbox>
          </CheckboxGroup>
        </Col>
      </Row>

      <Row :gutter="30" class="tender-row" v-if="tender.answerId!=null">
        <Col span="4" style="text-align: right">答疑文件：</Col>
        <Col span="13" style="text-align: left">
          <Button type="primary">
            {{tender.title}}.zip
          </Button>
          <Icon type="md-close" style="color: red;" size="30" @click="delFile" v-if="editshow==2"/>
        </Col>
      </Row>

      <Row v-if="tender.answerId==null || editshow==1">
        <Col span="20" offset="4">
          <div class="tender-upload">
            <Upload
              multiple
              type="drag"
              action=""
              :before-upload="handleUpload" :disabled="file!=''">
              <div style="padding: 16px">
                <Icon type="ios-cloud-upload" size="42" style="color: #3399ff"></Icon>
                <p>答疑文件上传 .zip文件</p>
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
    </div>

  </Card>
</template>

<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'

  export default {
    data() {
      return {
        tenderId: '',
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
        answer: {},
        isSave: false,
        isEdit: false,
        isDel: false,
        checkbox: [],
        radiobox:'',
        tenderTypes: [],
        tenderSubTypes: [],
        editshow: 0,
        scolor:'',
        tenderStatu: '',
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
          answerId: '',
        },
      }
    },
    created() {
      this.id = this.$route.params.id
      this.getData(this.id)
      this.getTypeDictInfo();//加载业务类型
    },
    methods: {
      getData(id) {
        this.$http.get(api.ANSWER_ID + "/" + id).then(res => {
          let result = res.data.data;
          this.tender = result
          //复选框
          this.radiobox = result.typ;
          this.checkbox = result.subTyp.split(",");

          if (result.answerId == null) {
            this.isSave = true;
          } else {
            this.isEdit = true;
            this.isDel = true;
          }
          this.tenderStatu = this.$store.state.tenderStatus[result.status];
          this.scolor = this.$store.state.tenderStatusColors[result.status];

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
      upload() {
        this.uploadStatus = '2';
        let formData = new FormData();
        formData.append("file", this.file);
        this.$http.post(api.ANSWER_UPLOAD, formData, {
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
                title:"上传文件类型错误,请上传.zip类型文件！",
                okText:'确认',
              });
            }
          }
        }).catch((error) => {
          this.uploadStatus = '4'
        });
      },
      handleSubmit() {
        this.answer.tenderId = this.id;
        this.answer.files = this.fileId;
        this.answer.id = this.tender.answerId;
        if (this.fileId != null && this.fileId != "" && this.fileId != "undefined") {
          this.$http.post(api.ANSWER_ADD, this.answer).then(res => {
            if (res.data.status == 200) {
              Message.message(res.data);
              this.isSave = false;
              this.isEdit = true;
              this.isDel = true;
              this.editshow = 0;//控制删除附件按钮
              this.delUpFile();
              this.getData(this.id)
            } else {
              this.$Message.error('操作失败!');
            }
          })
        } else {
          // alert("无上传附件！")
          this.$Modal.warning({
            title:"无上传附件！",
            // content:'删除！',
            okText:'确认',
            // cancelText:'取消',
          });

        }
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
      edit() {
        this.isSave = true;
        this.isEdit = false;
        this.isDel = false;
        this.editshow = 1;
        this.uploadStatus = 1;
        this.file = '';
        this.fileId = '';
        this.answer.files = null;
      },
      delete1() {
        this.isSave = false;
        this.isEdit = false;
        this.isDel = false;
        this.editshow = 2
      },
      delUpFile() {
        this.file = '';
        this.fileId = '';
        this.answer.files = null;
        this.uploadStatus = '1';
      },
      handleUpload(file) {
        this.file = file;
        this.uploadStatus = '5';
        return false;
      },
      delFile() {
        // let tips = confirm("确认删除吗?删除后不可恢复！")
        if (this.tender.answerId != null && this.tender.answerId != "" && this.tender.answerId != "undefined") {
          // if (tips == true) {
          this.$Modal.confirm({
            title:"确定删除吗?删除后不可恢复！",
            // content:'删除！',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
              this.$http.get(api.DELETE_ANSWER_BY_ID + "/" + this.tender.answerId).then(res => {
                Message.message(res.data);
                this.editshow == 0;
                this.file = '';
                this.fileId = '';
                this.answer.files = null;
                this.uploadStatus = 1;
                this.getData(this.id)
              })
            },
          });
          // }
        }
      },
      returnList() {//返回
        this.$router.push({
          path: "/answer"
        })
      },
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
    margin-top: 10px;
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
