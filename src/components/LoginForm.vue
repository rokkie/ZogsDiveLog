<template>
  <el-form v-bind:rules="rules" v-bind:model="loginModel" ref="loginForm">

    <el-form-item label="E-mail address" prop="emailAddress">
      <el-input type="email" placeholder="Enter your e-mail address" v-model="loginModel.emailAddress"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" placeholder="Enter your password" v-model="loginModel.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-on:click="onLoginBtnClick">Login</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
export default {
  name: 'login-form',

  data () {
    return {
      loginModel: {
        emailAddress: undefined,
        password    : undefined
      },

      rules: {
        emailAddress: [{
          required: true,
          type    : 'email',
          message : 'Please enter your e-mail address',
          trigger : 'blur'
        }],
        password: [{
          required: true,
          message : 'Please enter your password',
          trigger : 'blur'
        }]
      }
    };
  },

  methods: {
    onLoginBtnClick () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // Yey!
        }
      });
    }
  }
};
</script>
