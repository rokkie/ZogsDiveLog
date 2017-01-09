
export default class Foo {

  static install (Vue) {
    Vue.prototype.$foo = function () {
      return 'foo';
    };
  }

}
