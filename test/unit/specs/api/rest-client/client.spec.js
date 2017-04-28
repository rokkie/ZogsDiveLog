import RestClient from 'src/api/rest-client/client';
import Filter from 'src/api/rest-client/filter';
import Predicate from 'src/api/rest-client/predicate';
import Range from 'src/api/rest-client/range';
import Selection from 'src/api/rest-client/selection';
import Sort from 'src/api/rest-client/sort';
import {eq} from 'src/api/rest-client/operator';
import {asc, desc} from 'src/api/rest-client/order';

const API_URL = 'api-url';

/**
 * @test  {RestClient}
 */
describe('REST client', function () {

  /**
   * @test  {RestClient#rpc}
   */
  it('should perform a remote procedure call', function () {
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
  it('should find one resource', function () {
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
   * @test  {RestClient#findAll}
   */
  it('should find a list of resources', function () {
    const http      = {doGet: () => {}},
          mock      = sinon.mock(http),
          client    = new RestClient(http, API_URL),
          resource  = 'my-resource',
          range     = new Range(10, 100),
          selection = new Selection([
            'foo', 'bar',
            ['baz', {
              qux  : 'quux',
              corge: 'grault'
            }]
          ]),
          sorting   = new Sort({
            foo: asc,
            bar: desc
          }),
          filter    = new Filter([
            new Predicate('foo', eq, 'qux'),
            new Predicate('bar', eq, 'quux', true)
          ]);

    mock
      .expects('doGet')
      .once()
      .withArgs(`${API_URL}/${resource}`, {
        selection: 'foo,bar,baz{qux:quux,corge:grault}',
        foo      : 'eq.qux',
        bar      : 'not.eq.quux',
        order    : 'foo.asc,bar.desc'
      }, {
        'Range-Unit': 'items',
        Range       : '10-100'
      });

    client.findAll(resource, selection, filter, sorting, range);

    mock.verify();
  });

  /**
   * @test  {RestClient#findAll}
   */
  it('should default to selecting all', function () {
    const http      = {doGet: () => {}},
          mock      = sinon.mock(http),
          client    = new RestClient(http, API_URL),
          resource  = 'my-resource';

    client.findAll(resource);

    mock
      .expects('doGet')
      .once()
      .withArgs(`${API_URL}/${resource}`, {}, {});

    client.findAll(resource);

    mock.verify();
  });

  /**
   * @test  {RestClient#findAll}
   */
  it('should omit limit when only offset is specified', function () {
    const http      = {doGet: () => {}},
          mock      = sinon.mock(http),
          client    = new RestClient(http, API_URL),
          resource  = 'my-resource';

    mock
      .expects('doGet')
      .once()
      .withArgs(`${API_URL}/${resource}`, {}, {
        'Range-Unit': 'items',
        Range       : '10-'
      });

    client.findAll(resource, undefined, undefined, undefined, new Range(10));

    mock.verify();
  });

  /**
   * @test  {RestClient#rpc}
   * @test  {RestClient#findOne}
   */
  it('should throw on invalid arguments', function () {
    const client = new RestClient();

    expect(() => { client.rpc([]); }).to.throw(TypeError);
    expect(() => { client.rpc('foo', []); }).to.throw(TypeError);
    expect(() => { client.findOne([], 123); }).to.throw(TypeError);
    expect(() => { client.findOne('foo', 'bar'); }).to.throw(TypeError);
  });
});
