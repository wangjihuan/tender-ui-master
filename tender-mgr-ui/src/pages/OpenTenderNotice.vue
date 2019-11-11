<template>

  <Card icon="log-in" class="tender-card">
    <p slot="title" style="font-size: 20px">
      定标通知模板
    </p>
    <Button type="success">保存</Button>&nbsp;&nbsp;&nbsp;
    <Button type="primary">修改</Button>&nbsp;&nbsp;&nbsp;
    <Button type="success">启用</Button>&nbsp;&nbsp;&nbsp;
    <Button type="error">停用</Button>&nbsp;&nbsp;&nbsp;
    <br>
    <Form :model="formItem" :label-width="90" style="padding-top: 20px">

      <Row>
        <Col span="8">
          <FormItem label="发件邮箱地址" style="width: 300px;">
            <Input v-model="formItem.address" placeholder="dfylcg@orientscape.com" readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="用户名" style="width: 200px;">
            <Input v-model="formItem.userId" placeholder="dfyl" readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="密码" style="width: 200px;" readonly="true">
            <Input v-model="formItem.passward" placeholder="dfyl1234" readonly="true"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="模板状态" style="width: 200px;">
            <Input v-model="formItem.status" placeholder="启用" readonly="true"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="收件邮箱地址">
        <Input v-model="formItem.email" placeholder="向所有已投标的供应商发送邮件" readonly="true"></Input>
      </FormItem>
      <FormItem label="邮件主题">
        <Input v-model="formItem.scode" placeholder="同招标文件的招标标题" readonly="true"></Input>
      </FormItem>
      <FormItem label="邮件正文">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="“同招标文件名”已定标，请及时登陆招投标系统查看结果。http://192.168.205.49/" readonly="true"></Input>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        formValidate: {
          title: '',
          code: '',
          projectName: '',
          scode: '',
          date: '',
          date1: '',
          desc: ''
        },
        formItem: {
          address: 'dfylcg@orientscape.com',
          userId: 'dfyl',
          passward: 'dfyl1234',
          status: '启用',
          email: '向所有已投标的供应商发送邮件',
          scode:'同招标文件的招标标题',
          textarea: '“同招标文件名”已定标，请及时登陆招投标系统查看结果。http://192.168.205.49/'
        },
        ruleValidate: {
          title: [
            {required: true, message: '招标标题不能为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '编码不能为空', trigger: 'blur'}
          ],
          projectName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          scode: [
            {required: true, message: '项目编号不能为空', trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }
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
    margin-top: 10px;
  }
  .form_list {
    margin-top: 10px;
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
