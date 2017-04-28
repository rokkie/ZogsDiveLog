import Vue from 'vue';
import {Button, DatePicker, Form, FormItem, Input} from 'element-ui';
import SignupForm from 'src/components/SignupForm';

describe('SigupForm.vue', () => {
  let vm;

  before(() => {
    Vue.use(Button);
    Vue.use(DatePicker);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input);
  
    vm = new Vue({
      el    : document.createElement('div'),
      render: h => h(SignupForm)
    });
  });

  afterEach(() => {
    vm.$children[0].$refs.signupForm.resetFields();
  });
  
  it('should render correct contents', () => {
    const actualCount   = vm.$el.querySelectorAll('.el-form-item').length,
          expectedCount = 7,
          message       = `Expected SignupForm to contain ${expectedCount} elements, ${actualCount} found`;

    expect(actualCount).to.equal(expectedCount, message);
  });

  it('should validate first name for at least 3 characters', done => {
    const component = vm.$children[0];
    
    component.signupModel.firstName = 'a';
    component.$refs.signupForm.validateField('firstName', msg => {
      expect(msg.toLowerCase()).to.have.string('minimum length');
      done();
    });
  });

  it('should validate last name for at least 2 characters', done => {
    const component = vm.$children[0];
    
    component.signupModel.lastName = 'a';
    component.$refs.signupForm.validateField('lastName', msg => {
      expect(msg.toLowerCase()).to.have.string('minimum length');
      done();
    });
  });

  it('should validate date of birth not in the future', done => {
    const component = vm.$children[0],
          dob       = new Date();
    
    dob.setDate(dob.getDate() + 1);
    
    component.signupModel.dateOfBirth = dob;
    component.$refs.signupForm.validateField('dateOfBirth', msg => {
      expect(msg.toLowerCase()).to.have.string('future');
      done();
    });
  });

  it('should validate e-mail address for correct format', done => {
    const component = vm.$children[0];

    component.signupModel.emailAddress = 'invalid';
    component.$refs.signupForm.validateField('emailAddress', msg => {
      expect(msg.toLowerCase()).to.have.string('e-mail address');
      done();
    });
  });

  it('should validate password for at least 8 characters', done => {
    const component = vm.$children[0];

    component.signupModel.password = 'abcdefg';
    component.$refs.signupForm.validateField('password', msg => {
      expect(msg.toLowerCase()).to.have.string('minimum length');
      done();
    });
  });

  it('should validate password confirmation', done => {
    const component = vm.$children[0];
  
    component.signupModel.password        = 'abcdefgh';
    component.signupModel.passwordConfirm = 'abcdefg_';
    component.$refs.signupForm.validateField('passwordConfirm', msg => {
      expect(msg.toLowerCase()).to.have.string('not match');
      done();
    });
  });
});
