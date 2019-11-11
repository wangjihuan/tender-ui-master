<template>
  <div class="me-tender-bg">
    <Card icon="log-in" class="me-tender-card">
      <h2 slot="title">
        {{tender.title}}
      </h2>
      <span href="#" slot="extra" class="tender-code">
        招标编号：{{tender.code}}
      </span>
      <div style="text-align:center">
        <Row :gutter="30" class="me-tender-row">
          <Col span="4" class="info-title">招标项目名称：</Col>
          <Col span="13" style="text-align: left">{{tender.projectName}}</Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="me-tender-row">
          <Col span="4" class="info-title">招标项目编码：</Col>
          <Col span="13" style="text-align: left">{{tender.projectCode}}</Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="me-tender-row">
          <Col span="4" class="info-title">报名日期：</Col>
          <Col span="8" style="text-align: left">{{tender.startDateEnroll}} 至 {{tender.endDateEnroll}}</Col>
          <Col span="4" class="info-title">答疑日期：</Col>
          <Col span="8" style="text-align: left">{{tender.startDateAnswer}} 至 {{tender.endDateAnswer}}</Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="me-tender-row">
          <Col span="4" class="info-title">投标日期：</Col>
          <Col span="8" style="text-align: left">{{tender.startDateTender}} 至 {{tender.endDateTender}}</Col>
          <Col span="4" class="info-title">招标状态：</Col>
          <Col span="8" style="text-align: left">
            <Tag color="success">{{tenderStatus[tender.status]}}</Tag>
          </Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="me-tender-row">
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
        <Row :gutter="30" class="me-tender-row">
          <Col span="4" class="info-title">招标说明：</Col>
          <Col span="20" style="text-align: left">
            <Input v-model="tender.description" type="textarea" :autosize="{minRows: 2,maxRows: 15}" :readonly="true"></Input>
          </Col>
        </Row>
        <Divider/>
        <Row :gutter="30" class="me-tender-row">
          <Col span="4" class="info-title">招标文件：</Col>
          <Col span="13" style="text-align: left">
            <Button type="success" @click="downloadFile('tender')">点击下载，{{tender.title}}.zip</Button>
          </Col>
        </Row>
        <Divider/>
        <Card>
          <h3 slot="title" color="warning">
            投标文件
          </h3>
          <Button type="success" @click="downloadFile('bid')">点击下载，{{tender.title}}(投标文件).zip</Button>

          <Row>
            <Col span="20" offset="4">
              <div style="text-align: left;margin-top: 16px">
                <Form ref="formInline" :model="formInline" inline>
                  <FormItem prop="amount">
                    <Input v-model="formInline.amount" placeholder="投标金额（元）" :readonly=readonly>
                    <Icon type="logo-yen" slot="prepend"/>
                    <span slot="append">元</span>
                    </Input>
                  </FormItem>
                  <FormItem prop="contact">
                    <Input type="text" v-model="formInline.contact" placeholder="联系人" :readonly=readonly>
                    <Icon type="md-person" slot="prepend"/>
                    </Input>
                  </FormItem>
                  <FormItem prop="contactPhone">
                    <Input type="text" v-model="formInline.contactPhone" placeholder="联系方式" :readonly=readonly>
                    <Icon type="ios-call" slot="prepend"/>
                    </Input>
                  </FormItem>
                </Form>
              </div>
            </Col>
          </Row>

        </Card>
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
        readonly: true,
        checkbox:[],
        qualificationList:[],
        tenderTypes:[],
        formItem: {
          input: '',
          switch: true,
          date: '',
          date1: '',
          textarea: ''
        },
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
        formInline: {
          amount: null,
          contact: null,
          contactPhone: null,
          files: null,
          tenderId: null
        },
      }
    }
    ,
    created() {
      this.tenderId = this.$route.params.id;
      this.userTenderStatus = this.$route.params.status;

      this.$http.get(api.TENDER_INFO_ID + this.tenderId).then(res => {
        this.tender = res.data.data;
        this.checkbox = this.tender.subTyp.split(",");
        this.tender.qualification = this.tender.qualification.split(",");
        this.fileName = this.tender.title + ".zip";

        this.typId = this.tender.subTyp;
        this.getTypeClass(this.typId);
      });

      this.$http.get(api.ME_TENDER_INFO + this.tenderId).then(res => {
        this.formInline = res.data.data;
        this.formInline.amount = utils.numFormat(this.formInline.amount + "");
      });

      // 资质回显
      this.$http.get(api.QUALIFICATION).then(res => {
        if (res.data.status !== 200) {
          return;
        }
        this.qualificationList = res.data.data;
      })

      this.tenderStatus = utils.getData("tenderStatus");
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
      cancel() {
        this.$router.go(-1)
      },
      downloadFile(typ) {
        // this.isDownload = true;
        let files = "";
        if (typ == "bid") {
          //投标文件
          files = this.formInline.files;
          this.fileName = this.tender.title + "(投标文件).zip"
        } else {
          //招标文件
          files = this.tender.files;
        }
        this.$http({
          method: 'post',
          url: api.ME_TENDER_DOWNLOAD,
          data: {
            id:this.formInline.tenderId,
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
      }
    }
  }
</script>

<style>
  .me-tender-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .me-tender-card {
    padding: 16px;
    margin: 0px auto;
    max-width: 80%;
    text-align: center;
    background-color: #ffffff;
  }

  .me-tender-row {
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
