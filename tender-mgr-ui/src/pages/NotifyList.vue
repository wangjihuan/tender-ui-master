<template>
  <div class="tenderlist-bg">
    <Card class="tenderlist-bg">
      <Form ref="formInline" :model="formItem" :label-width="80" inline>
        <FormItem label="公告编号">
          <Input v-model="formItem.input" placeholder="公告编号"></Input>
        </FormItem>
        <FormItem label="公告标题">
          <Input v-model="formItem.input" placeholder="公告标题"></Input>
        </FormItem>
        <FormItem label="起止日期">
          <Input v-model="formItem.input" placeholder="起止日期"></Input>
        </FormItem>
        <FormItem label="公告状态">
          <Input v-model="formItem.input" placeholder="公告状态"></Input>
        </FormItem>
        <FormItem label="发布日期">
          <Input v-model="formItem.input" placeholder="发布日期"></Input>
        </FormItem>
        <Button type="info" class="btn-title">查询</Button>
        <Button type="info" class="btn-title">清空</Button>
        <Button type="success" class="btn-title" @click="create">新建</Button>
      </Form>
      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class=""
             style="overflow-y: hidden;max-height: 522px; overflow-x : hidden;"></Table>

      <!-- 分页栏 -->
      <div class="tenderlist-page">
        <Page :total="pagerData.page.totalCount" size="small" show-elevator show-sizer show-total/>
      </div>

    </Card>
  </div>

</template>

<script>
  //参考 https://www.iviewui.com/components/table
  export default {
    data() {
      return {
        loading: false,
        pagerData: {
          data: [{
            code: "20190306",
            title: "xxxx项目A",
            projectName: "xxxx园林养护有限公司A",
            date: "2019-03-05",
            status: "以投标",
            publishDate: "2019-03-06",
          }, {
            project: "xxxxxxxx项目B",
            code: "20190307",
            supplier: "xxxx绿地有限公司"

          }, {
            project: "xxxxxx项目C",
            code: "20190308",
            supplier: "xxxx有限养护有限公司"

          }, {
            project: "xxxxxx项目D",
            code: "20190309",
            supplier: "xxxx有限公司"
          }
          ],
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
        listColumns: [{
          title: '公告编号',
          key: 'code'
        },
          {
            title: '公告标题',
            key: 'title'
          },
          {
            title: '项目名称',
            key: 'projectName'
          },
          {
            title: '起止日期',
            key: 'date'
          },
          {
            title: '公告状态',
            key: 'status'
          },
          {
            title: '发布日期',
            key: 'publishDate'
          },
          {
            title: '查看',
            key: 'action',
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
                      // this.show(params.index)
                      this.$router.push({
                        // name: "tender-list",
                        path: "/notify-card"
                      })
                    }
                  }
                }, '点击查看'),
              ]);
            }
          }],
        formItem: {
          input: ''
        }
      };

    },
    methods: {
      onChange() {
      },
      changePage() {
      },
      create() {
        this.$router.push({
          // name: "tender-list",
          path: "/notify-card"
        })
      }
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
  .btn-title {
    margin-right:1em ;
  }
</style>
