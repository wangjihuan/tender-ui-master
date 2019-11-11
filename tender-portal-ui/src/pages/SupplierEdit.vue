<template>
  <div class="register-bg">
    <Card icon="log-in" title="修改" :bordered="false" class="register">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="企业名称" prop="companyName">
          <Input v-model="formValidate.companyName" placeholder="企业名称"></Input>
        </FormItem>
        <FormItem label="企业邮箱" prop="companyEmail">
          <Input v-model="formValidate.companyEmail" placeholder="企业邮箱"></Input>
        </FormItem>
        <FormItem label="组织机构代码" prop="orgCode">
          <Input v-model="formValidate.orgCode"></Input>
        </FormItem>
        <FormItem label="联系人" prop="contact">
          <Input v-model="formValidate.contact"></Input>
        </FormItem>
        <FormItem label="联系人电话" prop="contactPhone">
          <Input v-model="formValidate.contactPhone"></Input>
        </FormItem>
        <FormItem label="公司电话" prop="companyPhone">
          <Input v-model="formValidate.companyPhone"></Input>
        </FormItem>
        <FormItem label="公司地址" prop="companyAddr">
          <Input v-model="formValidate.companyAddr"></Input>
        </FormItem>
        <!--<FormItem label="证照信息" prop="" style="text-align: left">-->
        <!--<Upload action="//jsonplaceholder.typicode.com/posts/">-->
        <!--<Button icon="ios-cloud-upload-outline">Upload files</Button>-->
        <!--</Upload>-->
        <!--</FormItem>-->
        <FormItem label="证照信息" prop="companyAddr" style="text-align: left">
          <Button type="primary">
            {{formValidate.companyName}}.zip
          </Button>
        </FormItem>
        <Row>
          <Col span="20" offset="2">
            <div class="tender-upload">
              <Upload
                multiple
                type="drag"
                action=""
                :before-upload="handleUpload" :disabled="file!=''">
                <div style="padding: 16px">
                  <Icon type="ios-cloud-upload" size="42" style="color: #3399ff;"></Icon>
                  <p>证照上传 .zip文件</p>
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
        <Button type="success" @click="handleSubmit('formValidate')" style="width: 100%;padding: 8px 0">提交</Button>
        <!--<Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>-->
      </Form>
    </Card>
  </div>
</template>
<script>
  import * as api from '../api/api'

  export default {
    data() {
      return {
        formValidate: {
          id: '',
          companyName: '',
          companyEmail: '',
          orgCode: '',
          contact: '',
          contactPhone: '',
          companyPhone: '',
          companyAddr: '',
        },
        ruleValidate: {
          companyName: [
            {required: true, message: '企业名称不能为空！', trigger: 'blur'}
          ],
          companyEmail: [
            {required: true, message: '邮箱不能为空！', trigger: 'blur'},
            {type: 'email', message: '邮箱格式错误！', trigger: 'blur'}
          ],
          orgCode: [
            {required: true, message: '机构代码不能为空！', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请填写联系人！', trigger: 'blur'}
          ],
          contactPhone: [
            {required: true, message: '请填写联系人电话！', trigger: 'blur'}
          ],
          companyPhone: [
            {required: true, message: '请填写公司电话！', trigger: 'blur'}
          ],
          companyAddr: [
            {required: true, message: '公司地址不能为空！', trigger: 'blur'}
          ],
        },
        enrollUploadUrl: '',
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
      }
    },
    created() {
      this.$http.get(api.USER_INFO).then(res => {
        if (res.data.status === 200) {
          let result = res.data.data;
          this.formValidate = result
        }
      });
    },
    methods: {
      delUpFile() {
        this.file = '';
        this.fileId = '';
        this.uploadStatus = '1';
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
        this.$http.post(api.FILES_UPLOAD, formData, {
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
      handleSubmit(name) {
        if (this.formValidate.status == 1){
          this.$Message.error('审批中不可修改!');
          return
        }
        if (this.uploadStatus == 5) {
          this.$Message.error('证照信息更新请确认上传后再提交!');
          return
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.fileId != null && this.fileId != "" && this.fileId != "undefined") {
              this.formValidate.credentials = this.fileId;
            }
            this.$http.post(api.USER_EDIT, this.formValidate).then(res => {
              if (res.data.data == "ok") {
                this.$Message.success('修改成功!');
              } else {
                this.$Message.error('修改失败!');
              }
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style>
  .register-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .register {
    padding: 16px;
    margin: 0px auto;
    max-width: 40%;
    text-align: center;
    background-color: #ffffff;
  }
</style>
