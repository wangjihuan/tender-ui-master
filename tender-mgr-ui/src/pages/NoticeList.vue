<template>
  <div class="noticelist-bg">
    <Card class="noticelist-bg">
      <Form ref="formInline" :model="formItem" :label-width="80" inline>
        <FormItem label="中标编号">
          <Input v-model="formItem.input" placeholder="中标编号"></Input>
        </FormItem>
        <FormItem label="中标标题">
          <Input v-model="formItem.input" placeholder="中标标题"></Input>
        </FormItem>
        <FormItem label="推送内容">
          <Input v-model="formItem.input" placeholder="推送内容"></Input>
        </FormItem>
        <FormItem label="推送时间">
          <Input v-model="formItem.input" placeholder="推送时间"></Input>
        </FormItem>
        <Button type="success">查询</Button>
        <Button type="info">清空</Button>
      </Form>
      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class=""
             style="overflow-y: hidden;max-height: 522px; overflow-x : hidden;"></Table>

      <!-- 分页栏 -->
      <div class="noticelist-page">
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
            content: "关于XX公司中标的相关内容",
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
        listcolumns: [
          {
            type: 'index',
            title: '序号',
            width: 65,
            align: 'center'
          },
          {
          title: '中标编号',
          key: 'code'
        },
          {
            title: '中标标题',
            key: 'title'
          },
          {
            title: '推送内容',
            key: 'content'
          },
          {
            title: '推送时间',
            key: 'date'
          },
          // {
          //   title: '查看',
          //   key: 'action',
          //   width: 150,
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'primary',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             // this.show(params.index)
          //             this.$router.push({
          //               // name: "notice-list",
          //               path: "/notice-card"
          //             })
          //           }
          //         }
          //       }, '点击查看'),
          //     ]);
          //   }
          // }
          ],
        formItem: {
          input: ''
        }
      };

    },
    method: {
      onChange() {
      },
      changePage() {
      }
    }

  }
</script>
<style>
  .noticelist-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .noticelist-page {
    padding-top: 16px;
  }
</style>
