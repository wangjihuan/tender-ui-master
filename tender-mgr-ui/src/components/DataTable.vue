<template>
  <div>
    <div class="buttonGroup">
      <slot name="toolButtons"></slot>
    </div>
    <Table :loading="loading" border :height='height' stripe :columns="cols" :data="dataContent" @on-selection-change="onSelect"></Table>
    <Page ref="paging" v-if="pagingOption.showPaging" :total="total" style="margin-top:5px;float: right"
          :show-total="pagingOption.showTotal"
          @on-change="getData"></Page>
  </div>
</template>

<script>
  export default {

    data: function () {
      return {
        current: 1,
        pageSize: 10,
        dataContent: [],
        loading: false,
        total: 0,
        initPage: 1
      }
    },
    props: {
      height:{
        type:Number,
        default:500
      },
      url: {
        type: String,
        require: true
      },
      pagingOption: {
        type: Object,
        default: function () {
          return {
            showPaging: true,
            showTotal: true
          }
        }
      },
      cols: {},
      checkBox:{
        type:Boolean,
        default:true
      }
    },
    methods: {
      refresh() {
        this.getData(1)
      },

      getData(pageNum) {
        this.loading = true
        this.$http.get(this.url, this.getPagingInfo(pageNum)).then(res => {
          this.dataContent = res.result.data
          this.total = res.result.total
          this.loading = false
        })
      },
      getPagingInfo(page) {
        const param = {
          current: page,
          pageSize: this.pageSize
        }
        return param
      },
      onSelect(selection){
        this.$emit('onSelect',{
          selection:selection
        })
      }
    },
    mounted() {
      this.getData(this.initPage)
    },
    created(){
      if(this.checkBox){
        this.cols.unshift({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .margin(@border_width:10px) {
    margin-bottom: @border_width;
  }

  .buttonGroup {
    text-align: right;
    .margin(5px)
  }
</style>
