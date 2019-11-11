<template>
  <div class="approve-role-bg">
    <Modal v-model="modal12" draggable scrollable title="新增角色" @on-ok="onOk()">
      <Form ref="formInfo" :model=formInfo :label-width="80" style="padding: 16px">
        <FormItem label="审批角色" prop="code">
          <Select v-model="formInfo.code" filterable>
            <Option v-for="(item , index) in approveRoleList" :value="item.code" :key="item.index">{{ item.name }}</Option>
          </Select>
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
      <Table stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class=""></Table>

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
        modal13: false,
        modalTitleFlag: '',
        approveRole: '',
        approveRoleList: {},
        formInfo: {
          approveRoleIndex: ''
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
            key: 'code'
          },
          {
            title: '审批角色',
            key: 'name'
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal13 = true;
                      this.$router.push({
                        path: "/approve-supplier/membership",
                        query: {id: params.row.id , name: encodeURI(params.row.name) , code: params.row.code},
                      })
                    }
                  }
                }, '配置人员'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '删除',
                        content: '<p>确认要删除角色吗？</p>',
                        onOk: () => {
                          this.del(params.row.id);
                        },
                        onCancel: () => {
                        }
                      });

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
        this.$http.get(api.APPROVE_SUPPLIER_LIST + path).then((res) => {
          this.pagerData.data = res.data.data;
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
        } else if (this.modalTitleFlag === 'add') {
          let code = this.formInfo.code;
          let role = this.approveRoleList[code];
          let pagerData = this.pagerData.data;
          let flag = true;
          pagerData.forEach(e => {
            if (e.code === code) {
              flag = false;
              return;
            }
          });
          if (!flag) {
            Message.message({code: 201 , msg: "不能重复添加！"})
            return;
          }
          this.pagerData.data.push(role);
        }
      },
      add() {
        this.modal12 = true;
        this.handleReset("formInfo")
        this.formInfo.code = '';
        this.modalTitleFlag = 'add';
      },
      del(id) {
        this.$http.get(api.APPROVE_SUPPLIER_DELETE + "?groupId=" + id).then(res => {
          Message.message(res.data);
          this.search();
        });
      },
      getApproveRoleList() {
        this.$http.get(api.APPROVE_SUPPLIER_ROLE_LIST).then(res => {
          if (res.data.status === 200) {
            let data1 = res.data.data;
            for (let i = 0; i < data1.length; i++) {
              let data1Element = data1[i];
              this.approveRoleList[data1Element.code] ={
                id: data1Element.id,
                code: data1Element.code,
                name: data1Element.name
              };
            }
          }
        });
      }
    },
    created() {
      this.getApproveRoleList();
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
</style>
