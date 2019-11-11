<template>
  <div class="tender-bg">

    <Modal v-model="modal12" :closable="false"  :mask-closable="false" scrollable title="温馨提示">
      <p style="font-size: 1.3em;">{{enrollMsg}}</p>
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
            <Input v-model="tender.description" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                   :readonly="true"></Input>
          </Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="tender-row">
          <Col span="4" class="info-title">招标文件：</Col>
          <Col span="20" style="text-align: left">
            <Button type="primary" @click="downloadTenderFile" :loading="isDownload" title="点击下载">
              {{tender.title}}.zip
            </Button>
          </Col>
        </Row>
        <Divider/>
        <!--3 状态为报名中-->
        <Button type="success" v-if="tender.status===3 && !isShowTenderPerm" @click="toEnroll"
                style="margin-top: 2em;padding: 1em">
          我要报名
        </Button>
        <Button type="success" v-if="isShowTenderPerm" style="margin-top: 2em;padding: 1em">
          已参与报名
        </Button>


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
        typId: '',
        modal12: false,
        fileName:'',
        //是否正在下载
        isDownload: false,
        qualificationList: [],
        tenderTypes: [],
        checkbox: [],
        isShowTenderPerm: false,
        tenderId: '',
        tenderStatus: '',
        //是否拥有查看招标文件权限
        showTenderPerm: false,
        //报名信息
        enrollMsg: '',
        tender: {
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
          typ: '',
          subTyp: ''
        },
      }
    }
    ,
    created() {
      this.tenderId = this.$route.params.id;
      this.getData(this.tenderId);
      this.$http.get(api.TENDER_ISENROLL_ID + this.tenderId).then(res => {
        //是否已经报名过该标 ，true、false表示
        this.isShowTenderPerm = res.data.data;
      });
      this.tenderStatus = utils.getData("tenderStatus");
      // 资质回显
      this.$http.get(api.QUALIFICATION).then(res => {
        if (res.data.status !== 200) {
          return;
        }
        this.qualificationList = res.data.data;
      })

    },
    methods: {
      getData(id) {
        this.$http.get(api.TENDER_INFO_ID + this.tenderId).then(res => {
          this.tender = res.data.data;
          this.fileName = this.tender.title + ".zip";
          this.tender.qualification = this.tender.qualification.split(",");
          this.checkbox = this.tender.subTyp.split(",");
          // this.tenderStatus = this.$store.state.tenderStatus[this.tender.status];
          this.typId = this.tender.subTyp;
          this.getTypeClass(this.typId);
        })
      },
      //大小类型回显
      getTypeClass(tpyId) {
        let path = "?subTyp=" + tpyId
        this.$http.get(api.TYPE_CLASS + path).then(res => {
          if (res.data.status !== 200) {
            return;
          }
          let dictData = res.data.data;
          let data = {};
          dictData.forEach((o) => {
            data[o.type + '-' + o.id] = o.className;
          });
          this.tenderTypes = data;
        })
      },
      //报名
      toEnroll() {
        this.$Modal.confirm({
          title: "确定报名该标吗?",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            this.$http.get(api.TENDER_TO_ENROLL + this.tenderId).then(res => {
              //获取是否有报名资格
              if (res.data.status !== 200) {
                //账户没有资格
                this.enrollMsg = res.data.msg;
              } else {
                //报名成功
                // this.enrollMsg = "恭喜您报名成功，请耐心等待工作人员为您审核报名，审核完成后我们将以邮件的方式通知到您！"
                this.enrollMsg = "恭喜您报名成功！";
                this.$http.get(api.TENDER_ISENROLL_ID + this.tenderId).then(res => {
                  //是否已经报名过该标 ，true、false表示
                  this.isShowTenderPerm = res.data.data;
                });
              }
              this.modal12 = true;
            });
          },
        });
      },
      downloadTenderFile() {
        this.isDownload = true;
        let files = "";
          //招标文件
        files = this.tender.files;
        this.$http({
          method: 'post',
          url: api.ME_TENDER_DOWNLOAD,
          data: {
            id:this.tenderId,
            fileId: files
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
      //返回
      cancel() {
        this.$router.go(-1)
      }
    },
  }
</script>

<style>
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
    width: 50%;
    padding-top: 16px;
    margin: 0 auto;
  }

  .tender-code {
    font-size: 0.8em;
  }

</style>
