// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import Foo from './api/foo';
import Auth from './api/auth/index';

Vue.use(Foo);
Vue.use(Auth);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
