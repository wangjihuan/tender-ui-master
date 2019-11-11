<template>

  <Card icon="log-in" class="tender-card">
    <p slot="title">
      中标公告
    </p>
    <Button type="success">保存</Button>&nbsp;&nbsp;&nbsp;
    <Button type="primary">修改</Button>&nbsp;&nbsp;&nbsp;
    <Button type="warning">取消</Button>&nbsp;&nbsp;&nbsp;
    <Button type="info" @click="publish" >发布</Button>&nbsp;&nbsp;&nbsp;
    <Button type="warning">撤回</Button>&nbsp;&nbsp;&nbsp;
    <Button type="error">删除</Button>&nbsp;&nbsp;&nbsp;
    <Button @click="returnList('')" style="margin-left: 8px">返回</Button>
    <br>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" class="form_list">
      <FormItem label="公告标题" prop="title">
        <Input v-model="formValidate.title" placeholder="公告标题"></Input>
      </FormItem>
      <FormItem label="公告编号" prop="code">
        <Input v-model="formValidate.code" placeholder="公告编号"></Input>
      </FormItem>
      <FormItem label="招标项目名称" prop="projectName">
        <Select v-model="formValidate.projectName" filterable>
          <Option v-for="item in projectNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="招标标题" prop="tenderTitle">
        <Input v-model="formValidate.tenderTitle" placeholder="招标标题" disabled></Input>
      </FormItem>
      <FormItem label="招标编号" prop="tenderCode">
        <Input v-model="formValidate.tenderCode" placeholder="招标编号" disabled></Input>
      </FormItem>
      <FormItem label="招标项目编码" prop="scode">
        <Input v-model="formValidate.scode" placeholder="招标项目编码" disabled></Input>
      </FormItem>
      <FormItem label="招标起止日期">
        <Row>
          <Col span="4" style="text-align: left">
            <FormItem prop="date">
              <DatePicker type="date" placeholder="开始时间" v-model="formValidate.date" disabled></DatePicker>
            </FormItem>
          </Col>
          <Col span="1">-</Col>
          <Col span="4" style="text-align: left">
            <FormItem prop="date1">
              <DatePicker type="date" placeholder="结束时间" v-model="formValidate.date1" disabled></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="公告状态" prop="status" style="text-align: left">
        <Tag type="dot" color="primary">未发布</Tag>
      </FormItem>
      <FormItem label="中标说明">
        <Input v-model="formValidate.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="Enter something..."></Input>
      </FormItem>
      <!--<FormItem label="中标供应商名称" prop="supplierName">
        <Input v-model="formValidate.supplierName" placeholder="中标供应商名称"></Input>
      </FormItem>-->
      <FormItem label="中标供应商名称" prop="supplierName">
        <Row>
          <!--<Col span="12" style="padding-right:10px">
            <Select v-model="model11" filterable>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>-->
          <Col span="24">
            <Select v-model="model12" filterable multiple>
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="组织机构代码证" prop="Organizational ">
        <Input v-model="formValidate.organizational " placeholder="组织机构代码证" disabled></Input>
      </FormItem>
      <FormItem label="中标文件">
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
                <p>点击上传中标文件</p>
              </div>
            </Upload>
          </Col>
        </Row>
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
          title: 'xxxxxxxxx中标公告',
          code: '21323453',
          projectName: '',
          tenderTitle: 'xxxxx测试招标标题',
          scode: '',
          date: '2019-01-02',
          date1: '2019-02-04',
          desc: '',
          tenderCode: '689573629',
          textarea:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx说明',
          notifyStatus:'',
          organizational:'56748495'
        },
        projectNameList: [
          {
            value: 'xxxxx项目招标1',
            label: 'xxxxx项目招标1'
          },
          {
            value: 'xxxxx项目招标2',
            label: 'xxxxxxxx项目招标2'
          },
          {
            value: 'xxxxx项目招标3',
            label: 'xxxxxxxxxx项目招标3'
          },
        ],
        notifyStatusList: [
          {
            value: 'xxxxx招标1',
            label: '未发布'
          },
          {
            value: 'xxxxx招标2',
            label: '已发布'
          },
        ],
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
        cityList: [
          {
            value: '供应商1',
            label: '供应商1'
          },
          {
            value: '供应商2',
            label: '供应商2'
          },
          {
            value: '供应商3',
            label: '供应商3'
          },
          {
            value: '供应商4',
            label: '供应商4'
          },
          {
            value: '供应商5',
            label: '供应商5'
          },
          {
            value: '供应商6',
            label: '供应商6'
          }
        ],
        //model11: '',
        model12: [],
        isNew : false
      }
    },

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('成功!');
          } else {
            this.$Message.error('失败!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      returnList() {
        this.$router.push({
          // name: "tender-list",
          path: "/notify-list"
        })
      },
      publish() {
        this.$Message.info('发布成功！');
        this.$router.push({
          // name: "tender-list",
          path: "/notify-list"
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
