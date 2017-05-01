import Vue from 'vue';
import {Button, Form, FormItem, Input} from 'element-ui';
import LoginForm from 'src/components/LoginForm';

describe('LoginForm.vue', () => {
  let vm, $auth;
  
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

  beforeEach(() => {
    $auth = Vue.prototype.$auth;
  });

  afterEach(() => {
    vm.$children[0].$refs.loginForm.resetFields();
    Vue.prototype.$auth = $auth;
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

  it('should submit the credentials', () => {
    const component    = vm.$children[0],
          btnSubmit    = vm.$el.querySelector('button.el-button--primary'),
          emailAddress = 'user@example.com',
          password     = 'foobarbazqux',
          auth         = {login: () => {}},
          mock         = sinon.mock(auth),
          evt          = new Event('click', { bubbles: true });

    Vue.prototype.$auth = auth;

    mock
      .expects('login')
      .withArgs(emailAddress, password);

    Object.assign(component.loginModel, {
      emailAddress,
      password
    });

    btnSubmit.dispatchEvent(evt);

    mock.verify();
  });

  it('should not submit with invalid form values', () => {
    const component    = vm.$children[0],
          btnSubmit    = vm.$el.querySelector('button.el-button--primary'),
          emailAddress = 'notemail',
          password     = 'foo',
          auth         = {login: () => {}},
          mock         = sinon.mock(auth),
          evt          = new Event('click', { bubbles: true });

    Vue.prototype.$auth = auth;

    mock
      .expects('login')
      .never();

    Object.assign(component.loginModel, {
      emailAddress,
      password
    });

    btnSubmit.dispatchEvent(evt);

    mock.verify();
  });
});
