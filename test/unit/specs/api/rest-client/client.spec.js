import RestClient from 'src/api/rest-client/client';
import Filter from 'src/api/rest-client/filter';
import Predicate from 'src/api/rest-client/predicate';
import Range from 'src/api/rest-client/range';
import Selection from 'src/api/rest-client/selection';
import Sort from 'src/api/rest-client/sort';
import Query from 'src/api/rest-client/query';
import {eq} from 'src/api/rest-client/operator';
import {asc, desc} from 'src/api/rest-client/order';

const API_URL = 'api-url';

/**
 * @test  {RestClient}
 */
describe('REST client', () => {

  /**
   * @test  {RestClient#rpc}
   */
  it('should perform a remote procedure call', () => {
    const http     = {doPost: () => {}},
          mock     = sinon.mock(http),
          client   = new RestClient(http, API_URL),
          fn       = 'foo',
          args     = {
            bar: 'baz',
            qux: 'quux'
          };

    mock
      .expects('doPost')
      .once()
      .withArgs(`${API_URL}/rpc/${fn}`, args);

    client.rpc(fn, args);

    mock.verify();
  });

  /**
   * @test  {RestClient#findOne}
   */
  it('should find one resource', () => {
    const http     = {doGet: () => {}},
          mock     = sinon.mock(http),
          client   = new RestClient(http, API_URL),
          resource = 'foo',
          id       = 123;

    mock
      .expects('doGet')
      .once()
      .withArgs(
        `${API_URL}/${resource}`,
        {id: `eq.${id}`},
        {Accept: 'application/vnd.pgrst.object'}
      );

    client.findOne(resource, id);

    mock.verify();
  });

  /**
   * @test  {RestClient#find}
   */
  it('should find a list of resources', () => {
    const http   = {doGet: () => {}},
          mock   = sinon.mock(http),
          client = new RestClient(http, API_URL),
          query  = new Query();

    query.resource  = 'my-resource';
    query.range     = new Range(10, 100);
    query.selection = new Selection([
      'foo', 'bar',
      ['baz', {
        qux  : 'quux',
        corge: 'grault'
      }]
    ]);
    query.sort      = new Sort({
      foo: asc,
      bar: desc
    });
    query.filter    = new Filter([
      new Predicate('foo', eq, 'qux'),
      new Predicate('bar', eq, 'quux', true)
    ]);

    mock
      .expects('doGet')
      .once()
      .withArgs(`${API_URL}/${query.resource}`, {
        selection: 'foo,bar,baz{qux:quux,corge:grault}',
        foo      : 'eq.qux',
        bar      : 'not.eq.quux',
        order    : 'foo.asc,bar.desc'
      }, {
        'Range-Unit': 'items',
        Range       : '10-100'
      });

    client.find(query);

    mock.verify();
  });

  /**
   * @test  {RestClient#find}
   */
  it('should default to selecting all', () => {
    const http   = {doGet: () => {}},
          mock   = sinon.mock(http),
          client = new RestClient(http, API_URL),
          query  = new Query();

    query.resource = 'my-resource';

    mock
      .expects('doGet')
      .once()
      .withArgs(`${API_URL}/${query.resource}`, {}, {});

    client.find(query);

    mock.verify();
  });

  /**
   * @test  {RestClient#find}
   */
  it('should omit limit when only offset is specified', () => {
    const http   = {doGet: () => {}},
          mock   = sinon.mock(http),
          client = new RestClient(http, API_URL),
          query  = new Query();

    query.resource = 'my-resource';
    query.range    = new Range(10);

    mock
      .expects('doGet')
      .once()
      .withArgs(`${API_URL}/${query.resource}`, {}, {
        'Range-Unit': 'items',
        Range       : '10-'
      });

    client.find(query);

    mock.verify();
  });

  /**
   * @test  {RestClient#rpc}
   * @test  {RestClient#findOne}
   */
  it('should throw on invalid arguments', () => {
    const client = new RestClient();

    expect(() => { client.rpc([]); }).to.throw(TypeError);
    expect(() => { client.rpc('foo', []); }).to.throw(TypeError);
    expect(() => { client.findOne([], 123); }).to.throw(TypeError);
    expect(() => { client.findOne('foo', 'bar'); }).to.throw(TypeError);
    expect(() => { client.find('foo'); }).to.throw(TypeError);
    expect(() => { client.find(new Query()); }).to.throw(Error);
  });
});
