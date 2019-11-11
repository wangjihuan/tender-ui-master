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
        <Button type="info" class="btn-title" @click="search()">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
      </Form>

      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class=""></Table>

      <!-- 分页栏 -->
      <div class="tenderlist-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>

    </Card>
  </div>

</template>

<script>
  //参考 https://www.iviewui.com/components/table
  import * as api from '../api/api'

  export default {
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
            key: 'code'
          },
          {
            title: '招标标题',
            key: 'title'
          },
          {
            title: '项目编号',
            key: 'projectCode'
          },
          {
            title: '招标项目名称',
            key: 'projectName'
          },
          {
            title: '状态',
            key: 'status',
            width: 130,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              let color = '';
              let text = '';
              if (row.status == 7) {
                color = 'success';
                text = '已定标';
              }else if(row.status == 8){
                color = 'error';
                text = '流标';
              }

              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '查看',
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
                    innerHTML: "<i style='font-size: 28px' class='iconfont icon-view'></i>",
                    title: "点击查看"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/notify-card/" + params.row.id + "/" + params.row.status,
                      })
                    }
                  }
                }, '点击查看'),
              ]);
            }
          }],
        formItem: {
          code: '',
          title: ''
        }
      };

    },
    created() {
      this.search()
    },
    methods: {
      getData() {
        // if (this.formItem.status=="undefined" || this.formItem.status=="" || this.formItem.status==null) {
        //   this.formItem.status="";
        // }
        let path = "?code=" + this.formItem.code +
          "&title=" + this.formItem.title +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.NOTIFY_LIST + path).then((res) => {
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
<style>
  .tenderlist-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .tenderlist-page {
    padding-top: 16px;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
