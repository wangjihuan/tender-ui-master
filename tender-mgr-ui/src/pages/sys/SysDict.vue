<template>
  <div class="sysdict-bg">
    <Modal v-model="modal12" draggable scrollable :title="modalTitleFlag === 'edit'?'编辑字典':'新增字典'" @on-ok="onOk()">
      <Form ref="formInfo" :model=formInfo :label-width="80" style="padding: 16px">
        <FormItem label="字典编码" prop="code">
          <Input v-model="formInfo.code" placeholder="字典编码"></Input>
        </FormItem>
        <FormItem label="字典名称" prop="name">
          <Input v-model="formInfo.name" placeholder="字典名称"></Input>
        </FormItem>
        <FormItem label="是否启用" prop="isEnabled">
          <Switch size="large" v-model="formInfo.isEnabled">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </Switch>
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="formInfo.description" placeholder="描述"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Card class="sysdict-bg">
      <Form ref="formItem" :model="formItem" :label-width="80" inline>
        <FormItem label="字典编码" prop="code">
          <Input v-model="formItem.code" @keyup.enter.native="search()" placeholder="招标编号"></Input>
        </FormItem>
        <FormItem label="字典名称" prop="title">
          <Input v-model="formItem.name" @keyup.enter.native="search()" placeholder="招标标题"></Input>
        </FormItem>
        <Button type="info" class="btn-title" @click="search()">查询</Button>
        <Button @click="handleReset('formItem')" style="margin-left: 8px">清空</Button>
        <Button type="success" class="btn-title" @click="add">新建</Button>
      </Form>
      <!-- 数据表格 -->
      <Table stripe :loading="loading" border :columns="listColumns" :data="pagerData.data" class="">
      </Table>

      <div class="sysdict-page">
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
  import * as Message from '../../common/utils'

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
            title: '字典编码',
            key: 'code'
          },
          {
            title: '字典名称',
            key: 'name'
          },
          {
            title: '状态',
            width: 100,
            key: 'isEnabled',
            render: (h, params) => {
              const row = params.row;
              const color = row.isEnabled === 1 ? 'success' : 'error';
              const text = row.isEnabled === 1 ? '可用' : '禁用';

              return h('Tag', {
                props: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: '创建时间',
            key: 'gmtCreate'
          },
          {
            title: '修改时间',
            key: 'gmtModified'
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
                      this.$router.push({
                        path: "/sys-dict/details",
                        query: {dictCode: params.row.code , dictName: encodeURI(params.row.name)},
                      })
                    }
                  }
                }, '查看'),
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
                      this.formInfo = row;
                      this.formInfo.isEnabled = row.isEnabled === 1 && true || false;
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
          }],
        formItem: {
          code: '',
          name: ''
        }
      };

    },
    created() {
      this.search()
    },
    methods: {
      getData() {
        let path = "?code=" + this.formItem.code +
          "&name=" + this.formItem.name +
          "&current=" + this.pagerData.page.pageCurrent +
          "&size=" + this.pagerData.page.pageSize;
        this.$http.get(api.SYS_DICT_LIST + path).then((res) => {
          this.pagerData.data = res.data.data.records;
          this.pagerData.page.totalCount = res.data.data.total;
          this.pagerData.page.pageCount = res.data.data.pages;
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
      add() {
        this.modal12 = true;
        this.handleReset("formInfo")
        this.formInfo.id = '';;
        this.modalTitleFlag = 'add';
      },
      del(id) {
        this.$http.get(api.SYS_DICT_DELETE + "?id=" + id).then(res => {
          this.search();
        });
      },
      search() {
        this.getData();
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.formInfo.isEnabled = true;
      },
      onOk() {
        if (this.modalTitleFlag === 'edit') {
          this.formInfo.isEnabled = this.formInfo.isEnabled && 1 || 2;
          this.$http.post(api.SYS_DICT_EDIT, this.formInfo).then(res => {
            let data1 = res.data;
            Message.message(data1);
            if (data1.status === 200) {
              this.getData();
              // this.$router.push({
              //   path: "/tender-card",
              // })
            }

          });
        } else if (this.modalTitleFlag === 'add') {
          this.formInfo.isEnabled = this.formInfo.isEnabled && 1 || 2;
          this.$http.post(api.SYS_DICT_SAVE, this.formInfo).then(res => {
            let data1 = res.data;
            Message.message(data1);
            if (data1.status === 200) {
              this.getData();
              // this.$router.push({
              //   path: "/tender-card",
              // })
            }

          });

        }
      }
    }

  }
</script>
<style>
  .sysdict-bg {
    /*background-color: #eaeaea;*/
    padding: 16px;
  }

  .sysdict-page {
    padding-top: 16px;
  }

  .btn-title {
    margin-right: 1em;
  }

</style>
