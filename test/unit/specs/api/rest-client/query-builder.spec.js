import ns from 'src/util/namespace';
import QueryBuilder from 'src/api/rest-client/query-builder';
import Query from 'src/api/rest-client/query';

/**
 * @test  {QueryBuilder}
 */
describe('REST query builder', () => {

  /**
   * @test  {QueryBuilder#query}
   */
  it('should return a clone of the current query', () => {
    const qb = new QueryBuilder(),
          qi = ns(qb).query,
          q  = qb.query;

    expect(q).to.be.instanceOf(Query);
    expect(q).not.to.equal(qi);
  });

  /**
   * @test  {QueryBuilder#select}
   */
  it('should add fields to the selection', () => {
    const qb       = new QueryBuilder(),
          expected = 'foo,bar,baz';

    qb.select('foo')
      .select(['bar', 'baz']);

    expect(qb.query.selection.toString()).to.equal(expected);
  });

  /**
   * @test  {QueryBuilder#from}
   */
  it('should set the resource', () => {
    const qb       = new QueryBuilder(),
          resource = 'foobar';

    qb.from(resource);

    expect(qb.query.resource).to.equal(resource);
  });

  /**
   * @test  {QueryBuilder#where}
   */
  it('should add where clauses to the query', () => {
    const qb       = new QueryBuilder(),
          expected = {
            name: 'eq.Foo',
            age : 'not.gt.25'
          };

    qb.where('name', 'eq', 'Foo')
      .where('age', 'gt', 25, true);

    expect(qb.query.filter.toKeyVal()).to.deep.equal(expected);
  });

  /**
   * @test  {QueryBuilder#order}
   */
  it('should set the sorting of the resultset', () => {
    const qb = new QueryBuilder(),
          expected = 'foo.asc,bar.asc,baz.desc,qux.asc,grault.desc';

    qb.order('foo', 'asc')
      .order({
        bar: 'asc',
        baz: 'desc'
      })
      .order([
        ['qux', 'asc'],
        ['grault', 'desc'],
      ]);

    expect(qb.query.sort.toString()).to.equal(expected);
  });

  /**
   * @test  {QueryBuilder#limit}
   */
  it('should set the limit of the resultset', () => {
    const qb = new QueryBuilder();

    qb.limit(10, 100);
    expect(qb.query.range.offset).to.equal(10);
    expect(qb.query.range.limit).to.equal(100);

    qb.limit(25);
    expect(qb.query.range.offset).to.equal(10);
    expect(qb.query.range.limit).to.equal(25);
  });

  /**
   * @test  {QueryBuilder#reset}
   */
  it('should reset the query', () => {
    const qb = new QueryBuilder();

    qb.from('foo')
      .reset();

    expect(qb.query.resource).to.be.undefined;
  });
});
