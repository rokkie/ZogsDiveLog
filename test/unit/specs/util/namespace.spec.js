import namespace from 'src/util/namespace';

/**
 * @test  {namespace}
 */
describe('Namespace util', () => {
  
  /**
   * @test  {namespace}
   */
  it('should create a namespace for each instance', function () {
    function Foo() {
      namespace(this);
    }

    Object.defineProperty(Foo.prototype, 'myProp', {
      get: function () {
        return namespace(this).myProp;
      },
      set: function (value) {
        namespace(this).myProp = 'prefix-' + value;
      }
    });

    const foo1 = new Foo(),
          foo2 = new Foo();

    foo1.myProp = 'bar';
    foo2.myProp = 'baz';

    expect(foo1.myProp).to.be('prefix-bar');
    expect(foo2.myProp).to.be('prefix-baz');
  });
});
