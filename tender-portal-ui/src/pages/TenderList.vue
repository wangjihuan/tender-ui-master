<template>
  <div class="tenderlist-bg">
    <Card class="tenderlist-bg">
      <Form ref="formInline" :model="formItem" :label-width="80" inline>
        <FormItem label="招标编码">
          <Input v-model="formItem.code" placeholder="项目名称"></Input>
        </FormItem>
        <FormItem label="招标标题">
          <Input v-model="formItem.title" placeholder="投标项目编号"></Input>
        </FormItem>
        <!--<FormItem label="招标项目">-->
        <!--<Input v-model="formItem.projectName" placeholder="项目名称"></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="项目项目编号">-->
        <!--<Input v-model="formItem.projectCode" placeholder="投标项目编号"></Input>-->
        <!--</FormItem>-->
        <Button type="success" @click="search">查询</Button>
      </Form>
      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" size="large" border :columns="listcolumns" :data="pagerData.data" class=""></Table>

      <!-- 分页栏 -->
      <div class="tenderlist-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              :page-size="pagerData.page.pageSize"
              :page-size-opts="pagerData.page.arrPageSize"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>

</template>

<script>
  import * as api from '../api/api'
  import * as utils from '../common/utils'

  //参考 https://www.iviewui.com/components/table
  export default {
    data() {
      return {
        loading: false,
        pagerData: {
          data: [],
          page: {
            //分页数
            arrPageSize: [5, 10, 20, 30],
            //分页大小
            pageSize: 10,
            //总分页数
            pageCount: 1,
            //当前页面
            pageCurrent: 1,
            //总数
            totalCount: 0,
          }

        },
        listcolumns: [
          {
            type: 'index',
            title:'序号',
            width: 65,
            align: 'center'
          },
          {
            title: '招标编码',
            key: 'code',
            width: 160
          },
          {
            title: '招标标题',
            key: 'title'
          },
          {
            title: '招标项目编码',
            key: 'projectCode',
            width: 140
          },

          {
            title: '招标项目',
            key: 'projectName'
          },
          {
            title: '状态',
            key: 'status',
            width: 110,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = this.$store.state.tenderStatusColors[row.status];
              const text = utils.getData("tenderStatus")[row.status];
              return h('Tag', {
                props: {
                  // type: 'dot',
                  color: color
                }
              }, text);
            }
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
                    innerHTML: "<i style='font-size: 28px' class='iconfont icon-view'></i>",
                    title: "点击查看"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/tender-card/" + params.row.id
                      })
                    }
                  }
                }),
              ]);
            }
          }],
        formItem: {
          code: '',
          title: ''
        },
      };

    },
    created() {
      this.search();
    },
    methods: {
      getData() {
        let path = "?code=" + this.formItem.code +
          "&title=" + this.formItem.title +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.TENDER_PORTAL_LIST + path).then((res) => {
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
