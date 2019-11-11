<template>
  <div class="answer-bg">
    <Card class="answer-bg">
      <Form ref="formInline" :model="formItem" :label-width="80" inline>
        <FormItem label="招标编码">
          <Input v-model="formItem.code" placeholder="项目名称"></Input>
        </FormItem>
        <FormItem label="招标标题">
          <Input v-model="formItem.title" placeholder="投标项目编号"></Input>
        </FormItem>
        <Button type="success" @click="search">查询</Button>
      </Form>
      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" border :columns="listcolumns" :data="pagerData.data" class=""
             style="overflow-y: hidden;max-height: 522px; overflow-x : hidden;"></Table>

      <!-- 分页栏 -->
      <div class="answerlist-page">
        <Page :total="pagerData.page.totalCount" size="small" show-elevator show-sizer show-total/>
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
        isDownload: false,
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
            key: 'code'
          },
          {
            title: '招标标题',
            key: 'title'
          },
          {
            title: '招标项目编码',
            key: 'projectCode'
          },

          {
            title: '招标项目',
            key: 'projectName'
          },
          {
            title: '状态',
            key: 'status',
            width:'110',
            render: (h, params) => {
              const row = params.row;

              const color = "success";
              const text = "答疑中";
              return h('Tag', {
                props: {
                  // type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title: '答疑文件下载',
            key: 'action',
            width: 130,
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
                  domProps: { // 添加标签,使用自己引入的iconfont图标
                    innerHTML: "<i style='font-size: 28px' class='iconfont icon-yunxiazai'></i>",
                    title: "点击下载"
                  },
                  on: {
                    click: () => {
                      const row = params.row;
                      if (!row.file) {
                        utils.message({status: 201, msg: "该标书尚未上传答疑文件！"})
                        return
                      }
                      this.downloadAnswerFile(row.file, row.title + "答疑文件.zip");
                    }
                  }
                }, '点击下载'),
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
        this.$http.get(api.ANSWER_LIST + path).then((res) => {
          this.pagerData.data = res.data.data.records;
          this.pagerData.page.totalCount = res.data.data.total;
          this.pagerData.page.pageCount = res.data.data.pages;
        })
      },
      downloadAnswerFile(fileId, fileName) {
        this.isDownload = true;
        this.$http({
          method: 'post',
          url: api.ANSWER_DOWNLOAD_FILE ,
          data:{
            files: fileId
          },
          responseType: 'blob'
        }).then(response => {
          //下载失败的status为200 ，成功为201
          if (response.status == 200) {
            utils.message({status:202 , msg: "下载失败！"})
            return;
          }
          const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
          const aEle = document.createElement('a');     // 创建a标签
          const href = window.URL.createObjectURL(blob);       // 创建下载的链接
          aEle.href = href;
          aEle.download = fileName;  // 下载后文件名
          document.body.appendChild(aEle);
          aEle.click();     // 点击下载
          document.body.removeChild(aEle); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放掉blob对象
          this.isDownload = false;
        }).catch((error) => {
          this.isDownload = false;
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
    },
    computed: {
      tenderStatus() {
        debugger
        return this.$store.state.tenderStatus
      }
    },
  }
</script>
<style>
  .answer-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .answerlist-page {
    padding-top: 16px;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
