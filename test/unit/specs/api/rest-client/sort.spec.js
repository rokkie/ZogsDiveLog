import Sort from 'src/api/rest-client/sort';
import {asc, desc} from 'src/api/rest-client/order';

/**
 * @test  {Sort}
 */
describe('Sorting', function () {

  /**
   * @test  {Sort#constuctor}
   */
  it('should set sorting passed as object to the constructor', function () {
    const sort = new Sort({
      foo: asc,
      bar: desc
    });

    expect(sort.get('foo')).to.equal(asc);
    expect(sort.get('bar')).to.equal(desc);
  });

  /**
   * @test  {Sort#constuctor}
   */
  it('should set sorting passed as tuples to the constructor', function () {
    const sort = new Sort([
      ['foo', asc],
      ['bar', desc]
    ]);

    expect(sort.get('foo')).to.equal(asc);
    expect(sort.get('bar')).to.equal(desc);
  });

  /**
   * @test  {Sort#set}
   */
  it('should add column', function () {
    const sort   = new Sort(),
          column = 'foo';

    sort.set(column, asc);

    expect(sort.get(column)).to.equal(asc);
  });

  /**
   * @test  {Sort#get}
   */
  it('should return undefined when a column was not set', function () {
    const sort = new Sort();

    expect(sort.get('foo')).to.equal(undefined);
  });

  /**
   * @test  {Sort#\[Symbol.iterator\]}
   */
  it('should be iterable', function () {
    const sort = new Sort(),
          keys = ['foo', 'bar', 'baz'],
          vals = [asc, desc, asc];

    sort.set(keys[0], vals[0]);
    sort.set(keys[1], vals[1]);
    sort.set(keys[2], vals[2]);

    Array.from(sort).forEach(([key, val], idx) => {
      expect(key).to.equal(keys[idx]);
      expect(val).to.equal(vals[idx]);
    });
  });

  /**
   * @test  {Sort#strval}
   */
  it('should produce correct string values', function () {
    const sort = new Sort();

    sort.set('foo', asc);
    sort.set('bar', desc);

    expect(sort.strval).to.equal(`foo.${asc},bar.${desc}`);
  });

  /**
   * @test  {Sort#constructor}
   * @test  {Sort#set}
   * @test  {Sort#get}
   */
  it('should throw on invalid arguments', function () {
    const sort = new Sort();

    expect(() => { new Sort('foo'); }).to.throw(TypeError);
    expect(() => { sort.get([]); }).to.throw(TypeError);
    expect(() => { sort.set(() => {}); }).to.throw(TypeError);
    expect(() => { sort.set('foo', () => {}); }).to.throw(TypeError);
    expect(() => { sort.set('foo', 'invalid'); }).to.throw(RangeError);
  });
});
