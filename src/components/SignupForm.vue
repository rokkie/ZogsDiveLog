<template>
  <el-form v-bind:rules="rules" v-bind:model="signupModel" ref="signupForm">

    <el-form-item label="First name" prop="firstName">
      <el-input placeholder="Enter your first name" v-model="signupModel.firstName"></el-input>
    </el-form-item>
    <el-form-item label="Last name" prop="lastName">
      <el-input placeholder="Enter your last name" v-model="signupModel.lastName"></el-input>
    </el-form-item>
    <el-form-item label="Date of Birth" prop="dateOfBirth">
      <el-date-picker type="date" placeholder="Select your Cakeday" v-model="signupModel.dateOfBirth"></el-date-picker>
    </el-form-item>
    <el-form-item label="E-mail addres" prop="emailAddress">
      <el-input type="email" placeholder="Enter your e-mail address" v-model="signupModel.emailAddress"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" placeholder="Choose a password" v-model="signupModel.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="Password confirmation" prop="passwordConfirm">
      <el-input type="password" placeholder="Confirm your password" v-model="signupModel.passwordConfirm" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-on:click="onSignupBtnClick">Signup</el-button>
    </el-form-item>

  </el-form>
</template>
<script>
export default {
  name: 'signup-form',

  data () {
    return {
      signupModel: {
        firstName      : undefined,
        lastName       : undefined,
        dateOfBirth    : undefined,
        emailAddress   : undefined,
        password       : undefined,
        passwordConfirm: undefined
      },

      rules: {
        firstName: [{
          required: true,
          message : 'Please enter your first name',
          trigger : 'blur'
        }, {
          min    : 3,
          message: 'Minimum length is two characters',
          trigger: 'blur'
        }],
        lastName: [{
          required: true,
          message : 'Please enter your last name',
          trigger : 'blur'
        }, {
          min    : 3,
          message: 'Minimum length is three characters',
          trigger: 'blur'
        }],
        dateOfBirth: [{
          required: true,
          type    : 'date',
          message : 'Please enter your date of birth',
          trigger : 'blur'
        }, {
          trigger  : 'blur',
          validator: (rule, value, callback) => {
            const arg = (new Date() < value) ? new Error('Date of birth cannot be in the future') : undefined;
            callback(arg);
          }
        }],
        emailAddress: [{
          required: true,
          type    : 'email',
          message : 'Please enter your e-mail address',
          trigger : 'blur'
        }],
        password: [{
          required: true,
          message : 'Please choose a password',
          trigger : 'blur'
        }, {
          min    : 8,
          message: 'Minimum length is eight characters',
          trigger: 'blur'
        }, {
          trigger: 'blur',
          validator: (rule, value, callback) => {
            const passwordConfirm = this.signupModel.passwordConfirm;
            if (passwordConfirm && 0 < passwordConfirm.length) {
              this.$refs.signupForm.validateField('passwordConfirm');
            }
            callback();
          }
        }],
        passwordConfirm: [{
          trigger  : 'blur',
          validator: (rule, value, callback) => {
            const arg = (value !== this.signupModel.password) ? new Error('Passwords do not match') : undefined;
            callback(arg);
          }
        }]
      }
    };
  },

  methods: {
    onSignupBtnClick() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          // Yey!
        }
      });
    }
  }
};
</script>
