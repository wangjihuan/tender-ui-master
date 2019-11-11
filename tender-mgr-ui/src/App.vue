<template>
  <div id="app" :style="{height: clientHeight}">
    <router-view/>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        // light、dark、primary
        theme1: 'dark',
        clientHeight: '600px',
        clientHeightWatch: '',
        timer:false
    }
    },
    methods: {
      clickItem(name) {
        // alert(name)
        this.$router.push({
          name: name
        })
      },
      getClientHeight() {
        this.clientHeight = window.innerHeight - 0 + 'px';
      }
    },
    created() {
      this.getClientHeight();
    },
    components: {
    },
    mounted() {
      // 动态设置背景图的高度为浏览器可视区域高度
      // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
      const that = this;
      window.onresize = function temp() {
        that.clientHeightWatch = window.innerHeight - 0 + 'px';
      };
    },
    watch: {
      clientHeightWatch (val) {
        if (!this.timer) {
          this.clientHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            console.log(that.clientHeight)
            that.timer = false
          }, 150)
        }
      }
    }

  }
</script>

<style>
  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
