
export default class Bar {

  static install (Vue) {
    Vue.prototype.$bar = function () {
      return new Promise(function (resolve) {
        return resolve('bar');
      });
    };
  }
}
