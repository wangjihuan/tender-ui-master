<template>
  <div class="tenderlist-bg">
    <Card class="tenderlist-bg">
      <Form ref="formItem" :model="formItem" :label-width="80" inline>
        <FormItem label="招标编号" prop="code">
          <Input v-model="formItem.code" @keyup.enter.native="search()" placeholder="招标编号"></Input>
        </FormItem>
        <FormItem label="招标标题" prop="title">
          <Input v-model="formItem.title" @keyup.enter.native="search()" placeholder="招标标题"></Input>
        </FormItem>
        <FormItem label="项目名称" prop="projectName">
          <Input v-model="formItem.projectName" @keyup.enter.native="search()" placeholder="项目名称"></Input>
        </FormItem>
        <FormItem label="招标类别" prop="status">
          <Select v-model="formItem.status" placeholder="请选择" style="width: 190px" @keyup.enter.native="search()">
            <Option value="1">保存</Option>
            <Option value="2">待报名</Option>
            <Option value="3">报名中</Option>
            <Option value="4">报名截止</Option>
            <Option value="5">招标中</Option>
            <Option value="6">评标中</Option>
            <Option value="7">已定标</Option>
            <Option value="8">流标</Option>
          </Select>
        </FormItem>
        <Button type="info" class="btn-title" @click="search()">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
      </Form>

      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class="">
      </Table>
      <div class="bidlist-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>
</template>

<script>
  import * as api from '../api/api'
  import * as Message from '../common/utils'

  export default {
    name: "Bid",
    data() {
      return {
        loading: false,
        pagerData: {
          data: [],
          page: {
            //分页数
            arrPageSize: [10, 20, 30, 40],
            //分页大小
            pageSize: 10,
            //总分页数
            pageCount: 1,
            //当前页面
            pageCurrent: 1,
            //总数
            totalCount: 0
          }

        },
        listcolumns: [
          {
            type: 'index',
            title: '序号',
            width: 65,
            align: 'center'
          },
          {
            title: '招标编号',
            key: 'code',
            width: 185,
          },
          {
            title: '招标标题',
            key: 'title'
          },
          {
            title: '项目名称',
            key: 'projectName'
          },
          {
            title: '开始日期',
            key: 'startDateTender',
            width:'110px'
          },
          {
            title: '截止日期',
            key: 'endDateTender',
            width:'110px'
          },
          {
            title: '招标状态',
            key: 'status',
            width: 110,
            render: (h, params) => {
              const row = params.row;
              let color = this.$store.state.tenderStatusColors[row.status];
              let text = this.$store.state.tenderStatus[row.status];
              return h('Tag', {
                props: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: '投标数量',
            key: 'sl',
            width:'70px',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            width: 70,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  // props: {
                  //   type: 'primary',
                  //   size: 'small'
                  // },
                  // style: {
                  //   marginRight: '5px'
                  // },
                  style:{
                    color:'#1296db',
                    cursor: 'pointer',
                    marginRight: '5px',
                  },
                  domProps: {
                    // innerHTML: "<i style='font-size: 34px' class='iconfont icon-baozhengjinguanli'></i>",
                    // title: "投标保证金管理"
                    innerHTML: "<i class='iconfont icon-view'></i>",
                    title: "查看"
                  },
                  on: {
                    click: () => {
                      this.getData()
                      this.$router.push({
                        path: "BidCard/" + params.row.id,
                      })
                    }
                  }
                }, '投标详情'),
              ]);
            }
          }],
        formItem: {
          code: '',
          title: '',
          status:'',
          projectName:''
        }
      }
    },
    created() {
      this.search()
    },
    methods: {
      getData(){
        if (this.formItem.status=="undefined" || this.formItem.status=="" || this.formItem.status==null) {
          this.formItem.status="";
        }
        let path = "?code=" + this.formItem.code +
          "&title=" + this.formItem.title +
          "&status=" + this.formItem.status +
          "&projectName=" + this.formItem.projectName +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.BID_LIST + path).then((res) => {
          this.pagerData.data = res.data.data.records;
          this.pagerData.page.totalCount = res.data.data.total;
          this.pagerData.page.pageCount = res.data.data.pages;
        })
      },
      onPageSizeChange(newSize) {
        this.pagerData.page.pageCurrent = 1;
        this.pagerData.page.pageSize = newSize;
        this.getData();
      },
      changePage(newCurrent) {
        this.pagerData.page.pageCurrent = newCurrent;
        this.getData();
      },
      search() {
        this.getData();
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
    }


  }

</script>

<style scoped>
  .bidlist-page{
    padding-top: 5px;
    float: right;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
