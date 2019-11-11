<template>
  <div class="notify-bg">

    <Card v-if="status == 7" icon="log-in" class="notify">
      <p slot="title" class="notify-title">
        {{bid.title}} 的中标公告
      </p>
      <span href="#" slot="extra" class="notify-code">
        编号：{{bid.code}}
      </span>
      <div class="notify-row-div">
        <Row :gutter="30" class="notify-row">
          <Col span="11" style="text-align: right">招标标题：</Col>
          <Col span="13" style="text-align: left">{{bid.title}}</Col>
        </Row>
        <Row :gutter="30" class="notify-row">
          <Col span="11" style="text-align: right">招标项目编号：</Col>
          <Col span="13" style="text-align: left">{{bid.projectCode}}</Col>
        </Row>
        <Row :gutter="30" class="notify-row">
          <Col span="11" style="text-align: right">招标项目名称：</Col>
          <Col span="13" style="text-align: left">{{bid.projectName}}</Col>
        </Row>
        <Row :gutter="30" class="notify-row">
          <Col span="11" style="text-align: right">招标起止日期：</Col>
          <Col span="13" style="text-align: left">{{bid.startDateTender}} 至 {{bid.endDateTender}}</Col>
        </Row>
        <Row :gutter="30" class="notify-row">
          <Col span="11" style="text-align: right">公告状态：</Col>
          <Col span="13" style="text-align: left">已发布</Col>
        </Row>
        <Row :gutter="30" class="notify-row">
          <Col span="11" style="text-align: right">中标说明：</Col>
          <Col span="13" style="text-align: left">经招标单位综合评定，确立<p style="font-size: 16px;font-weight:bold">
            {{bid.companyNames}}</p>为第一中标候选单位
          </Col>
        </Row>
        <Row :gutter="30" class="notify-row">
          <Col span="11" style="text-align: right">中标供应商名称：</Col>
          <Col span="13" style="text-align: left"><p style="font-size: 16px;font-weight:bold">{{bid.companyNames}}</p>
          </Col>
        </Row>
        <!--<Row :gutter="30" class="notify-row">-->
        <!--<Col span="11" style="text-align: right">组织机构代码证：</Col>-->
        <!--<Col span="13" style="text-align: left">91110115MA018D9K8C</Col>-->
        <!--</Row>-->
        <Row :gutter="30" class="notify-row" v-if="files != null && files != ''">
          <Col span="11" style="text-align: right">中标文件：</Col>
          <Col span="13" style="text-align: left">
            <Button type="primary" @click="downloadTenderFile" :loading="isDownload" title="点击下载">
              {{bid.title}}.zip
            </Button>
          </Col>
        </Row>
      </div>
    </Card>

    <Card v-if="status == 8" class="notify1">
      <h2 style="text-align: center;">关于"{{bid.title}}"竞争性谈判流标情况说明</h2><br>
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="left">
        <FormItem prop="description">
          <Input v-model="bid.reason" type="textarea" :autosize="{minRows: 2,maxRows: 15}"
                 :readonly="true"></Input>
        </FormItem>
      </Form>
    </Card>
  </div>

</template>

<script>
  import * as api from '../api/api'

  export default {
    data() {
      return {
        id: '',
        status: '',
        fileName: '',
        files: '',
        //是否正在下载
        isDownload: false,
        bid: {
          title: '',
          code: '',
          projectCode: '',
          projectName: '',
          startDateTender: '',
          endDateTender: '',
          status: '',
        },
        formValidate: {
          description: ''
        },
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.status = this.$route.params.status
      this.$http.get(api.NOTIFY_TENDER_ID + this.id).then(res => {
        if (res.data.status === 200) {
          if (res.data.data != null) {
            this.bid = res.data.data;
            this.formValidate = res.data.data;
            this.files = res.data.data.files;
            this.fileName = this.bid.title + ".zip";
          }
        }
      });
    },
    methods: {
      //下载标书文件
      downloadTenderFile() {
        this.isDownload = true;
        this.$http({
          method: 'post',
          url: api.NOTIFY_DOWNLOAD,
          data: {
            id: this.id,
            fileName: this.fileName,
            fileId: this.bid.files,
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
  .notify-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .notify {
    padding: 16px;
    margin: 0px auto;
    max-width: 80%;
    text-align: center;
    background-color: #ffffff;
  }

  .notify1 {
    padding: 16px;
    margin: 0px auto;
    max-width: 80%;
    text-align: left;
    background-color: #ffffff;
  }

  .notify-row {
    margin-top: 10px;
  }

  .notify-title {
  }

  .notify-code {
    font-size: 0.8em;
  }

  .notify-row-div {
    /*margin: 0 auto;*/
  }


</style>
