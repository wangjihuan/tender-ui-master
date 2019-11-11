<template>
  <div class="approve-role-bg">
    <Modal v-model="modal12" draggable scrollable :title="modalTitleFlag === 'edit'?'编辑角色':'新增角色'" @on-ok="onOk()">
      <Form ref="formInfo" :model=formInfo :label-width="80" style="padding: 16px">
        <FormItem label="角色编码" prop="code">
          <Input v-model="formInfo.code" placeholder="角色编码" :readonly=isReadonly></Input>
        </FormItem>
        <FormItem label="角色名称" prop="name">
          <Input v-model="formInfo.name" placeholder="角色名称"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Card class="approve-role-bg">
      <Form ref="formItem" :model="formItem" :label-width="100" inline>
        <FormItem label="审批角色" prop="name">
          <Input v-model="formItem.name" @keyup.enter.native="search()" placeholder="审批角色"></Input>
        </FormItem>
        <Button @click="search()" type="success">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
        <Button type="success" class="btn-title" @click="add">新建</Button>
      </Form>
      <!-- 数据表格 -->
      <Table id="mygrid" stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class=""></Table>

      <!-- 分页栏 -->
      <div class="approve-role-page">
        <Page :total="pagerData.page.totalCount" :current="pagerData.page.pageCurrent"
              @on-page-size-change="onPageSizeChange"
              @on-change="changePage" size="small" show-elevator show-sizer show-total/>
      </div>
    </Card>
  </div>
</template>

<script>
  import * as api from '../../api/api'
  import * as Message from '../../common/utils'
  export default {
    name: "ApproveRole",
    data() {
      return {
        loading: false,
        modal12: false,
        modalTitleFlag: '',
        isReadonly: false,
        formInfo: {
          code: '',
          name: '',
        },
        formItem: {
          name: ''
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
            totalCount: 0,
          }
        },
        listColumns: [
          {
            title: '序号',
            type: 'index',
            width: 65,
            align: 'center'
          },
          {
            title: '审批角色编码',
            key: 'code',
            sortable: true
          },
          {
            title: '审批角色',
            key: 'name',
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal12 = true;
                      let row = params.row;
                      this.formInfo.code = row.code;
                      this.formInfo.name = row.name;
                      this.isReadonly = true;
                      this.modalTitleFlag = 'edit';
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.del(params.row.id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],

      }
    },
    methods: {
      getData() {
        let path = "?name=" + this.formItem.name +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.APPROVE_ROLE_LIST + path).then((res) => {
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
      onOk() {
        if (this.modalTitleFlag === 'edit') {
          this.formInfo.isEnabled = this.formInfo.isEnabled && 1 || 2;
          this.$http.post(api.APPROVE_ROLE_EDIT, this.formInfo).then(res => {
            let data1 = res.data;
            Message.message(data1);
            if (data1.status === 200) {
              this.getData();
            }

          });
        } else if (this.modalTitleFlag === 'add') {
          this.formInfo.isEnabled = this.formInfo.isEnabled && 1 || 2;
          this.$http.post(api.APPROVE_ROLE_SAVE, this.formInfo).then(res => {
            let data1 = res.data;
            Message.message(data1);
            if (data1.status === 200) {
              this.getData();
            }

          });
        }
      },
      add() {
        this.modal12 = true;
        this.handleReset("formInfo")
        this.formInfo.code = '';
        this.modalTitleFlag = 'add';
        this.isReadonly = false;
      },
      del(id) {
        this.$http.get(api.APPROVE_ROLE_DELETE + "?id=" + id).then(res => {
          this.search();
        });
      },
    },
    created() {
      this.getData();
    },
    mounted() {
    }
  }

</script>

<style scoped>
  .approve-role-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .approve-role-page {
    padding-top: 5px;
    float: right;
  }

  #mygrid .ivu-table th {

    text-align: center;

  }
</style>
