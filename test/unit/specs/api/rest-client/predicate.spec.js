import Predicate from 'src/api/rest-client/predicate';
import {gt, eq} from 'src/api/rest-client/operator';

/**
 * @test  {Predicate}
 */
describe('Filter predicate', () => {

  /**
   * @test  {Predicate#column}
   * @test  {Predicate#operator}
   * @test  {Predicate#value}
   */
  it('should get and set properties', () => {
    const predicate = new Predicate('foo', gt, 'bar');

    predicate.column   = 'baz';
    predicate.operator = eq;
    predicate.value    = 'qux';

    expect(predicate.column).to.equal('baz');
    expect(predicate.operator).to.equal('eq');
    expect(predicate.value).to.equal('qux');
  });

  /**
   * @test  {Predicate#negate}
   * @test  {Predicate#isNegated}
   */
  it('should negate an existing operator', () => {
    const predicate = new Predicate('foo', eq, 'bar', true);

    expect(predicate.isNegated).to.equal(true);
    expect(predicate.operator).to.equal('not.eq');

    predicate.negate();

    expect(predicate.isNegated).to.equal(false);
    expect(predicate.operator).to.equal('eq');

    predicate.negate();

    expect(predicate.isNegated).to.equal(true);
    expect(predicate.operator).to.equal('not.eq');
  });

  /**
   * @test  {Predicate#toString}
   */
  it('should convert to string', () => {
    const predicate = new Predicate('foo', eq, 'bar'),
          date      = new Date();

    expect(predicate.toString()).to.equal('bar');

    predicate.value = true;
    expect(predicate.toString()).to.equal('true');

    predicate.value = ['foo', 'bar'];
    expect(predicate.toString()).to.equal('foo,bar');

    date.setUTCFullYear(2000, 0, 1);
    date.setUTCHours(0, 0, 0, 0);
    predicate.value = date;
    expect(predicate.toString()).to.equal('2000-01-01T00:00:00.000Z');
  });

  /**
   * @test  {Predicate#constructor}
   */
  it('should throw on invalid arguments', () => {
    const predicate = new Predicate('foo', eq, 'bar');

    expect(() => { new Predicate([], eq, 'bar'); }).to.throw(TypeError);
    expect(() => { new Predicate('foo', [], 'bar'); }).to.throw(TypeError);
    expect(() => { new Predicate('foo', eq, {}); }).to.throw(TypeError);

    expect(() => { predicate.column = []; }).to.throw(TypeError);
    expect(() => { predicate.operator = []; }).to.throw(TypeError);
    expect(() => { predicate.value = {}; }).to.throw(TypeError);
  });
});
