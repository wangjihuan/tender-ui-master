<template>

    <Card icon="log-in" class="tender-card">
      <p slot="title">
        招标文件
      </p>
      <Button type="success">保存</Button>&nbsp;&nbsp;&nbsp;
      <Button type="primary">修改</Button>&nbsp;&nbsp;&nbsp;
      <Button type="warning">取消</Button>&nbsp;&nbsp;&nbsp;
      <Button type="info">发布</Button>&nbsp;&nbsp;&nbsp;
      <Button type="warning">撤回</Button>&nbsp;&nbsp;&nbsp;
      <Button type="error">删除</Button>&nbsp;&nbsp;&nbsp;
      <Button @click="returnList('')" style="margin-left: 8px">返回</Button>
      <br>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="form_list">
        <FormItem label="招标标题" prop="title">
          <Input v-model="formValidate.title" placeholder="标题"></Input>
        </FormItem>
        <FormItem label="招标编号" prop="code">
          <Input v-model="formValidate.code" placeholder="编号"></Input>
        </FormItem>
        <FormItem label="招标项目名称" prop="projectName">
          <Input v-model="formValidate.projectName" placeholder="招标项目名称"></Input>
        </FormItem>
        <FormItem label="招标项目编码" prop="scode">
          <Input v-model="formValidate.scode" placeholder="招标项目编号"></Input>
        </FormItem>
        <FormItem label="起止日期">
          <Row>
            <Col span="4" style="text-align: left">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="开始时间" v-model="formValidate.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="1">-</Col>
            <Col span="4" style="text-align: left">
              <FormItem prop="date1">
                <DatePicker type="date" placeholder="结束时间" v-model="formValidate.date1"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="招标要求">
          <Input v-model="formValidate.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="招标文件">
          <Row :gutter="30" class="tender-row">
            <Col span="8" style="text-align: left">
              <a href="#">xxxxxx.word 点击下载</a><br/>
              <a href="#">xxxxxx.png 点击下载</a><br/>
              <a href="#">xxxxxx.excel 点击下载</a>
            </Col>
            <Col span="12" style="text-align: left">
              <Upload
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/">
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击上传招标文件</p>
                </div>
              </Upload>
            </Col>
          </Row>
        </FormItem>
        <Divider/>
      </Form>
        <Card v-if="false">
          <h3 slot="title" color="warning">
            投 标 文 件
          </h3>
          <Table stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class=""
                 style="overflow-y: hidden;max-height: 522px; overflow-x : hidden;"></Table>
        </Card>
    </Card>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        formValidate: {
          title: 'xxxxxx项目招标',
          code: '123123123',
          projectName: 'xxxxxxxx项目',
          scode: '123123',
          date: '2018-01-02',
          date1: '2019-01-09',
          desc: 'xxxxxxxxxxxxxxxx',
          textarea: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx要求'
        },
        formItem: {
          input: '',
          textarea: ''
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
          date: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],
          date1: [
            {required: true, type: 'date', message: '时间不能为空', trigger: 'change'}
          ],
        },
        pagerData: {
          data: [{
            supplierName: "供应商1名称",
            fileName: "投标文件1",
            status: 2,
          }, {
            supplierName: "供应商1名称",
            fileName: "投标文件2",
            status:1
          }, {
            supplierName: "供应商2名称",
            fileName: "投标文件1",
            status:1
          }, {
            supplierName: "供应商2名称",
            fileName: "投标文件2",
            status:1
          }
          ],
        },
        isNew: true,
        listcolumns: [
          {
            title: '供应商名称',
            key: 'supplierName'
          },
          {
            title: '附件',
            key: 'fileName'
          },
          {
            title: '下载',
            key: 'downLoad',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '打包下载'),
              ]);
            }
          }
        ],
      }
    },
    created() {
      this.isNew = this.$router.params.isNew;
      console.log(this.isNew)
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
      returnList() {
        this.$router.push({
          // name: "tender-list",
          path: "/tender-list"
        })
      }
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
