<template>
  <div class="resetpwd-bg">
    <Card icon="log-in" title="重置密码" :bordered="false" class="resetpwd">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="原密码" prop="oldPassword">
          <Input type="password" v-model="formCustom.oldPassword"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
          <Input type="password" v-model="formCustom.newPassword"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwordCheck"></Input>
        </FormItem>

        <FormItem class="resetpwd-btn">
          <Button type="primary" @click="handleSubmit('formCustom')">保存</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>

    </Card>

  </div>

</template>
<script>
  import * as api from '../api/api';
  import * as Message from '../common/utils'

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.passwordCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwordCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.formCustom.password) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };
      const validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          if (this.formCustom.passwordCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwordCheck');
          }
          callback();
        }
        // 模拟异步验证效果
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('Please enter a numeric value'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('Must be over 18 years of age'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };

      return {
        formCustom: {
          newPassword: '',
          passwordCheck: '',
          oldPassword: ''
        },
        ruleCustom: {
          newPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwordCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          oldPassword: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('前端校验通过!');
          } else {
            this.$Message.error('前端校验失败!');
          }
        })
        let params = {
          oldPassword: this.formCustom.oldPassword,
          newPassword: this.formCustom.newPassword
        };
        this.$http.post(api.RESET_PASSWORD, params).then(res => {
          Message.message(res.data);
        });

      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style>
  .resetpwd-bg {
    height: 100%;
    /*background-color: #eaeaea;*/
    padding-top: 50px;
  }

  .resetpwd {
    padding: 16px;
    margin: 0px auto;
    max-width: 30%;
    text-align: center;
    background-color: #ffffff;
  }
</style>
