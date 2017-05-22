import Query from 'src/api/rest-client/query';
import Selection from 'src/api/rest-client/selection';
import Filter from 'src/api/rest-client/filter';
import Range from 'src/api/rest-client/range';
import Sort from 'src/api/rest-client/sort';

/**
 * @test  {Query}
 */
describe('REST query', () => {

  /**
   * @test  {Query#resource}
   */
  it('should get/set resource', () => {
    const query = new Query(),
          name  = 'foo';

    query.resource = name;
    expect(query.resource).to.equal(name);
  });

  /**
   * @test  {Query#selection}
   */
  it('should lazy get Selection', () => {
    const query = new Query(),
          selection = query.selection;

    expect(selection).to.be.instanceOf(Selection);
  });

  /**
   * @test  {Query#filter}
   */
  it('should lazy get Filter', () => {
    const query = new Query(),
          filter = query.filter;

    expect(filter).to.be.instanceOf(Filter);
  });

  /**
   * @test  {Query#sort}
   */
  it('should lazy get Sort', () => {
    const query = new Query(),
          sort = query.sort;

    expect(sort).to.be.instanceOf(Sort);
  });

  /**
   * @test  {Query#range}
   */
  it('should lazy get Range', () => {
    const query = new Query(),
          range = query.range;

    expect(range).to.be.instanceOf(Range);
  });

  /**
   * @test  {Query#resource}
   * @test  {Query#selection}
   * @test  {Query#filter}
   * @test  {Query#sort}
   * @test  {Query#range}
   */
  it('should throw on invalid arguments', () => {
    const query = new Query();

    expect(() => { query.resource = []; }).to.throw(TypeError);
    expect(() => { query.selection = ''; }).to.throw(TypeError);
    expect(() => { query.filter = ''; }).to.throw(TypeError);
    expect(() => { query.sort = ''; }).to.throw(TypeError);
    expect(() => { query.range = ''; }).to.throw(TypeError);
  });
});
