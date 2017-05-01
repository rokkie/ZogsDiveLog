import fetchMock from 'fetch-mock';
import HttpClient from 'src/api/http-client/client';
import * as errors from 'src/api/http-client/error';
import * as methods from 'src/api/http-client/method';

/**
 * @test  {HttpClient}
 */
describe('HTTP Client', () => {

  /**
   * @test  {HttpClient#doGet}
   */
  it('should perform a GET request', () => {
    const client = new HttpClient(),
          mname  = 'get-uri',
          uri    = 'uri',
          re     = new RegExp(`^https?://[\\w-]+(?::\\d+)?/${uri}`, 'gi'),
          mock   = fetchMock.mock({
            name    : mname,
            matcher : req => ('GET' === req.method && re.test(req.url)),
            response: Promise.resolve('{"foo": "bar"}')
          }),
          p      = client.doGet(uri).then((actual) => {
            expect(actual).to.deep.equal({
              foo: 'bar'
            });
          });

    expect(mock.called(mname)).to.be.true;

    fetchMock.restore();

    return p;
  });

  /**
   * @test  {HttpClient#doPut}
   */
  it('should perform a PUT request', () => {
    const client = new HttpClient(),
          mname  = 'put-uri',
          uri    = 'uri',
          data   = {foo: 'bar'},
          re     = new RegExp(`^https?://[\\w-]+(?::\\d+)?/${uri}`, 'gi'),
          mock   = fetchMock.mock({
            name    : mname,
            matcher : req => ('PUT' === req.method && re.test(req.url)),
            response: Promise.resolve('{"baz": "qux"}')
          }),
          p      = client.doPut(uri, data).then((actual) => {
            expect(actual).to.deep.equal({
              baz: 'qux'
            });
          });

    expect(mock.called(mname)).to.be.true;

    fetchMock.restore();

    return p;
  });

  /**
   * @test  {HttpClient#doPatch}
   */
  it('should perform a PATCH request', () => {
    const client = new HttpClient(),
          mname  = 'patch-uri',
          uri    = 'uri',
          data   = {foo: 'bar'},
          re     = new RegExp(`^https?://[\\w-]+(?::\\d+)?/${uri}`, 'gi'),
          mock   = fetchMock.mock({
            name    : mname,
            matcher : req => ('PATCH' === req.method && re.test(req.url)),
            response: Promise.resolve('{"baz": "qux"}')
          }),
          p      = client.doPatch(uri, data).then((actual) => {
            expect(actual).to.deep.equal({
              baz: 'qux'
            });
          });

    expect(mock.called(mname)).to.be.true;

    fetchMock.restore();

    return p;
  });

  /**
   * @test  {HttpClient#doPost}
   */
  it('should perform a POST request', () => {
    const client = new HttpClient(),
          mname  = 'post-uri',
          uri    = 'uri',
          data   = {foo: 'bar'},
          re     = new RegExp(`^https?://[\\w-]+(?::\\d+)?/${uri}`, 'gi'),
          mock   = fetchMock.mock({
            name    : mname,
            matcher : req => ('POST' === req.method && re.test(req.url)),
            response: Promise.resolve('{"baz": "qux"}')
          }),
          p      = client.doPost(uri, data).then((actual) => {
            expect(actual).to.deep.equal({
              baz: 'qux'
            });
          });

    expect(mock.called(mname)).to.be.true;

    fetchMock.restore();

    return p;
  });

  /**
   * @test  {HttpClient#doDelete}
   */
  it('should perform a DELETE request', () => {
    const client = new HttpClient(),
          mname  = 'delete-uri',
          uri    = 'uri',
          re     = new RegExp(`^https?://[\\w-]+(?::\\d+)?/${uri}`, 'gi'),
          mock   = fetchMock.mock({
            name    : mname,
            matcher : req => ('DELETE' === req.method && re.test(req.url)),
            response: Promise.resolve('{"baz": "qux"}')
          }),
          p      = client.doDelete(uri).then((actual) => {
            expect(actual).to.deep.equal({
              baz: 'qux'
            });
          });

    expect(mock.called(mname)).to.be.true;

    fetchMock.restore();

    return p;
  });

  /**
   * @test  {HttpClient#request}
   */
  it('should throw on invalid response', () => {
    const client = new HttpClient(),
          mname  = 'err-uri',
          uri    = 'uri',
          mock   = fetchMock.mock({
            name    : mname,
            matcher : () => true,
            response: Promise.resolve('-- invalid --')
          }),
          p      = client.doGet(uri).catch(reason => {
            expect(reason).to.be.instanceof(SyntaxError);
            expect(reason.message).to.have.string(errors.INVALID_RESPONSE.code);
          });

    expect(mock.called(mname)).to.be.true;

    fetchMock.restore();

    return p;
  });

  /**
   * @test  {HttpClient#request}
   */
  it('should throw on invalid arguments', () => {
    const client = new HttpClient();

    expect(() => { client.request([], methods.get); }).to.throw(TypeError);
    expect(() => { client.request('uri', []); }).to.throw(TypeError);
    expect(() => { client.request('uri', 'invalid'); }).to.throw(RangeError);
    expect(() => { client.request('uri', methods.get, []); }).to.throw(TypeError);
    expect(() => { client.request('uri', methods.get, '', []); }).to.throw(TypeError);
  });
});
