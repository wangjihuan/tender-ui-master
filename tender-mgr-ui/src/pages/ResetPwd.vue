<template>
  <div class="resetpwd-bg">
      <Card icon="log-in" title="重置密码" :bordered="false" class="resetpwd">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="原密码" prop="age">
            <Input type="text" v-model="formCustom.age" number></Input>
          </FormItem>
          <FormItem label="新密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
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
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Age cannot be empty'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter a numeric value'));
          } else {
            if (value < 18) {
              callback(new Error('Must be over 18 years of age'));
            } else {
              callback();
            }
          }
        }, 1000);
      };

      return {
        formCustom: {
          passwd: '',
          passwdCheck: '',
          age: ''
        },
        ruleCustom: {
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
          age: [
            {validator: validateAge, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
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
