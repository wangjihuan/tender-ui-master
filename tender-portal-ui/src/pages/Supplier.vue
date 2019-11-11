<template>
  <div class="supplier-bg">
    <Card icon="log-in" title="供应商信息" :bordered="false" class="supplier">
      <!--<Avatar style="background-color: #87d068" icon="ios-person" />-->
      <!--<span class="supplier-name">某某某有限公司</span>-->
      <!--<br/>-->
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align: right">企业名称</Col>
        <Col span="14" style="text-align: left">{{user.companyName}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align: right">企业邮箱</Col>
        <Col span="14" style="text-align: left">{{user.companyEmail}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align: right">组织机构代码证</Col>
        <Col span="14" style="text-align: left">{{user.orgCode}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align: right">联系人</Col>
        <Col span="14" style="text-align: left">{{user.contact}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align: right">联系人电话</Col>
        <Col span="14" style="text-align: left">{{user.contactPhone}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align: right">公司电话</Col>
        <Col span="14" style="text-align: left">{{user.companyPhone}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align: right">公司地址</Col>
        <Col span="14" style="text-align: left">{{user.companyAddr}}</Col>
      </Row>
      <Row :gutter="30" class="supplier-row">
        <Col span="10" style="text-align:right">证照信息</Col>
        <Col span="14" style="text-align: left">
          <Button type="primary" @click="downloadTenderFile" :loading="isDownload" title="点击下载">
            {{user.companyName}}.zip
          </Button>
        </Col>
      </Row>
      <Button type="primary" @click="handleSubmit('formCustom')" class="supplier-edit">修改</Button>
    </Card>
  </div>

</template>
<script>

  import * as api from '../api/api'

  export default {
    data() {
      return {
        user: {
          companyName: '',
          companyEmail: '',
          orgCode: '',
          password: '',
          contact: '',
          contactPhone: '',
          companyPhone: '',
          companyAddr: ''
        },
        //是否正在下载
        isDownload: false,
        fileName: '',
      }
    },
    methods: {
      //下载标书文件
      downloadTenderFile() {
        this.isDownload = true;
        this.$http({
          method: 'post',
          url: api.FILES_DOWNLOAD,
          data: {
            id: this.user.id,
            fileName: this.fileName,
            fileId: this.user.credentials
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
      handleSubmit(a) {
        if (this.user.status == 1) {
          this.$Message.error('审批中不可修改!');
          return
        }
        this.$router.push({
          name: "supplier-edit"
        })
      }
    },
    created() {
      this.$http.get(api.USER_INFO).then(res => {
        if (res.data.status === 200) {
          this.user = res.data.data;
          this.fileName = this.user.companyName + ".zip";
        }
      });
    }


  }
</script>
<style>
  .supplier-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .supplier {
    padding: 16px;
    margin: 0px auto;
    max-width: 50%;
    text-align: center;
    background-color: #ffffff;
    font-size: 15px;
  }

  .supplier-name {
    font-size: 1.2em;
    margin-left: 5px;
  }

  .supplier-row {
    margin-top: 10px;
  }

  .supplier-edit {
    margin-top: 32px;

  }


</style>
