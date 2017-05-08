import * as qs from 'src/util/query-string';

/**
 * @test {query-string}
 */
describe('QueryString util', () => {

  /**
   * @test {query-string#extract}
   */
  it('should extract the query string from a URL', () => {
    const loc    = 'http://www.example.com',
          q      = 'foo=bar&baz=qux',
          url    = `${loc}?${q}`,
          actual = qs.extract(url);

    expect(actual).to.equal(q);
  });

  /**
   * @test {query-string#to}
   */
  it('should convert key/value pairs to a query string', () => {
    const expected = 'foo=bar&baz=qux&grault=true&wa%26ld%2Fo=q%25%3Fx',
          actual   = qs.to({
            foo      : 'bar',
            baz      : 'qux',
            grault   : true,
            'wa&ld/o': 'q%?x'
          });
    
    expect(actual).to.equal(expected);
  });

  /**
   * @test {query-string#from}
   */
  it('should convert a query string to key/value pairs', () => {
    const actual   = qs.from('foo=bar&baz=qux&grault&wa%26ld%2Fo=q%25%3Fx'),
          expected = {
            foo      : 'bar',
            baz      : 'qux',
            grault   : true,
            'wa&ld/o': 'q%?x'
          };
  
    expect(actual).to.deep.equal(expected);
  });
});
