<template>
  <div class="sys-log-bg">

    <Card class="sys-log-bg">
      <Form ref="formItem" :model="formItem" :label-width="80" inline>
        <FormItem label="用户名" prop="code">
          <Input v-model="formItem.username" @keyup.enter.native="search()" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="日期范围" prop="title">
          <DatePicker :value="dateScope" v-model="formItem.dateScope" format="yyyy/MM/dd" type="daterange"
                      placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
        </FormItem>
        <Button type="info" class="btn-title" @click="search()">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
      </Form>
      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class="">
      </Table>

      <div class="sys-log-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>

</template>

<script>
  //参考 https://www.iviewui.com/components/table
  import * as api from '../../api/api'
  import * as utils from '../../common/utils'

  export default {
    data() {
      return {
        loading: false,
        modal12: false,
        modalTitleFlag: '',
        formInfo: {
          id: '',
          name: '',
          code: '',
          description: '',
          isEnabled: true

        },
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
        listColumns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '操作人',
            key: 'username'
          },
          {
            title: '访问菜单',
            key: 'message'
          },
          {
            title: '类信息',
            key: 'details'
          },
          {
            title: '参数',
            key: 'args'
          },
          {
            title: '是否成功',
            key: 'succeed'
          },
          {
            title: '操作时间',
            key: 'createtime'
          },
        ],
        formItem: {
          username: '',
          dateScope: '',
          stDate: '',
          endDate: ''
        },
        dateScope: []
      };

    },
    created() {
      this.search()
    },
    methods: {
      getData() {
        let dateScope = this.formItem.dateScope;
        if (dateScope) {
          this.formItem.stDate = utils.getDate(dateScope[0]);
          this.formItem.endDate = utils.getDate(dateScope[1]);
        }
        let path = "?username=" + this.formItem.username +
          "&stDate=" + this.formItem.stDate +
          "&endDate=" + this.formItem.endDate +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.SYS_LOG_LIST + path).then((res) => {

          this.pagerData.data = res.data.data.content;
          this.pagerData.page.totalCount = res.data.data.totalElements;
          this.pagerData.page.pageCount = res.data.data.totalPages;
        })
      },
      remove(index) {

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
        this.formInfo.isEnabled = true;
      },
    }

  }
</script>
<style>
  .sys-log-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .sys-log-page {
    padding-top: 16px;
  }

  .btn-title {
    margin-right: 1em;
  }

</style>
