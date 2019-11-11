<template>
  <div class="notify-bg">
    <Modal
      v-model="modal1"
      title="感谢您的注册申请！"
      @on-ok="ok"
      @on-cancel="cancel">
      <p class="modal-register">恭喜您激活成功，我们将尽快为你人工审核，审核完成过后，我们将通过邮箱的形式，通知到您,请您注意查收！</p>
    </Modal>
    <Modal
      v-model="modal2"
      title="感谢您的注册申请！"
      @on-ok="ok"
      @on-cancel="cancel">
      <p class="modal-register">激活失败！请重新注册获取激活码。</p>
    </Modal>
    <!--<Card icon="log-in" class="notify">-->
      <!--<p slot="title" class="notify-title">-->
        <!--注册用户激活-->
      <!--</p>-->

      <!--激活码30分钟内有效，是否立即激活?<br>-->
      <!--<br>-->
      <!--<Button @click="handleSubmit()" type="success">是</Button>-->
      <!--&lt;!&ndash;<Button type="warning">否</Button>&ndash;&gt;-->
    <!--</Card>-->
  </div>
</template>

<script>
  import * as api from "../api/api"
  //参考 https://www.iviewui.com/components/table
  export default {
    data() {
      return {
        modal1: false,
        modal2: false,
      }
    },
    methods: {
      handleSubmit() {
        this.$http.get(api.ACTIVATE_ID + "?id=" + this.$route.query.id).then(res => {
          console.log(res.data.data)
          if (res.data.data == '激活成功') {
            this.modal1 = true;
          } else {
            this.modal2 = true;
            // this.$Message.success(res.data.data);
          }
        })
      },
      ok() {
        this.$router.push({
          path: "/login"
        })
      },
      cancel() {
        this.$router.push({
          path: "/login"
        })
      }
    },
    created() {
      this.handleSubmit();
    }
  }
</script>
<style>
  .notify-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .notify {
    padding: 16px;
    margin: 0px auto;
    max-width: 80%;
    text-align: center;
    background-color: #ffffff;
  }

</style>
