import Vue from 'vue';
import {Button, Form, FormItem, Input} from 'element-ui';
import LoginForm from 'src/components/LoginForm';

describe('LoginForm.vue', () => {
  let vm;
  
  before(() => {
    Vue.use(Button);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Input);
    
    vm = new Vue({
      el    : document.createElement('div'),
      render: h => h(LoginForm)
    });
  });
  
  afterEach(() => {
    vm.$children[0].$refs.loginForm.resetFields();
  });
  
  it('should render correct contents', () => {
    const actualCount   = vm.$el.querySelectorAll('.el-form-item').length,
          expectedCount = 3,
          message       = `Expected LoginForm to contain ${expectedCount} elements, ${actualCount} found`;
    
    expect(actualCount).to.equal(expectedCount, message);
  });
  
  it('should validate e-mail address for correct format', done => {
    const component = vm.$children[0];
    
    component.loginModel.emailAddress = 'invalid';
    component.$refs.loginForm.validateField('emailAddress', msg => {
      expect(msg.toLowerCase()).to.have.string('e-mail address');
      done();
    });
  });
  
  it('should validate password for required', done => {
    const component = vm.$children[0];

    component.loginModel.password = '';
    component.$refs.loginForm.validateField('password', msg => {
      expect(msg.toLowerCase()).to.have.string('password');
      done();
    });
  });
});
