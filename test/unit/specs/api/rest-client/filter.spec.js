import Filter from 'src/api/rest-client/filter';
import Predicate from 'src/api/rest-client/predicate';
import {eq} from 'src/api/rest-client/operator';

/**
 * @test  {Filter}
 */
describe('Filters', function () {

  /**
   * @test  {Filter#addPredicate}
   */
  it('should add a predicate', function () {
    const filter = new Filter();

    filter.addPredicate(new Predicate('foo', eq, 'bar'));

    expect(filter.keyval).to.deep.equal({
      foo: 'eq.bar'
    });
  });

  /**
   * @test  {Filter#removePredicate}
   */
  it('should remove a predicate', function () {
    const predicates = [
            new Predicate('foo', eq, 'bar'),
            new Predicate('baz', eq, 'qux'),
          ],
          filter     = new Filter(predicates);

    filter.removePredicate(predicates[0]);

    expect(filter.keyval).to.deep.equal({
      baz: 'eq.qux'
    });
  });

  /**
   * @test  {Filter#removePredicate}
   */
  it('should ignore removing non-existent predicates', function () {
    const filter    = new Filter([new Predicate('foo', eq, 'bar')]),
          predicate = new Predicate('baz', eq, 'qux');

    filter.removePredicate(predicate);

    expect(filter.keyval).to.deep.equal({
      foo: 'eq.bar'
    });
  });

  /**
   * @test  {Filter#\[Symbol.iterator\]
   */
  it('should be iterable', function () {
    const predicates = [
            new Predicate('foo', eq, 'bar'),
            new Predicate('baz', eq, 'qux'),
          ],
          filter     = new Filter(predicates);

    Array.from(filter).forEach((predicate, idx) => {
      expect(predicate).to.equal(predicates[idx]);
    });
  });

  /**
   * @test  {Filter#constructor}
   * @test  {Filter#addPredicate}
   */
  it('should throw on invalid arguments', function () {
    const filter = new Filter();

    expect(() => { new Filter('foo'); }).to.throw(TypeError);
    expect(() => { new Filter(['foo']); }).to.throw(TypeError);
    expect(() => { filter.addPredicate('foo'); }).to.throw(TypeError);
    expect(() => { filter.removePredicate('foo'); }).to.throw(TypeError);
  });
});
