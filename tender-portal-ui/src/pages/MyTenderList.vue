<template>
  <div class="mtenderlist-bg">
    <Card class="mtenderlist-bg">
      <Form ref="formInline" :model="formItem" :label-width="80" inline>
        <FormItem label="招标项目">
          <Input v-model="formItem.input" placeholder="项目名称"></Input>
        </FormItem>
        <FormItem label="项目编号">
          <Input v-model="formItem.input" placeholder="投标项目编号"></Input>
        </FormItem>
        <Button type="success" @click="search">查询</Button>
      </Form>
      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class=""
             style="overflow-y: hidden;max-height: 522px; overflow-x : hidden;"></Table>

      <!-- 分页栏 -->
      <div class="mtender-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              :page-size="pagerData.page.pagesize"
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
            pagesize: 10,
            //总分页数
            pageCount: 1,
            //当前页面
            pageCurrent: 1,
            //总数
            totalCount: 80
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
            title: '招标编码',
            key: 'code'
          },
          {
            title: '招标标题',
            key: 'title'
          },
          {
            title: '招标项目',
            key: 'projectName'
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
            title: '投标状态',
            key: 'userTenderStatus',
            width: 140,
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              let color = '';
              let text = '';
              if (row.userTenderStatus == 3 && row.status == 7) {
                color = 'success';
                text = '中标';
              } else if (row.userTenderStatus == 4 && row.status == 7) {
                color = 'error';
                text = '未中标';
              } else {
                color = '#3ce0f0';
                text = '已投标';
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
                  style: {
                    color: '#1296db',
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
                        path: "/mtender-card/" + params.row.tenderId + "/" + params.row.userTenderStatus
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
        }
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
          "&size=" + this.pagerData.page.pagesize;
        this.$http.get(api.ME_TENDER_LIST + path).then((res) => {
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
  .mtenderlist-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .mtender-page {
    padding-top: 16px;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
