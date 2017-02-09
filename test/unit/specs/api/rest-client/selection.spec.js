import Selection from 'src/api/rest-client/selection';

/**
 * @test {Selection}
 */
describe('Selections', function () {

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should add a single field', function () {
    const selection = new Selection();

    selection.addField('foo');

    expect(selection.strval).to.equal('foo');
  });

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should add a field with an alias', function () {
    const selection = new Selection();

    selection.addField('foo', 'fooAlias');

    expect(selection.strval).to.equal('fooAlias:foo');
  });

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should add multiple fields', function () {
    const selection = new Selection();

    selection.addFields(['foo', 'bar']);

    expect(selection.strval).to.equal('foo,bar');
  });

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should add a list of tuples as fields with aliases', function () {
    const selection = new Selection();

    selection.addFields([
      ['fooAlias', 'foo'],
      ['barAlias', 'bar'],
      ['bazAlias', 'baz']
    ]);

    expect(selection.strval).to.equal('fooAlias:foo,barAlias:bar,bazAlias:baz');
  });

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should add an object hash as fields with aliases', function () {
    const selection = new Selection();

    selection.addFields({
      fooAlias: 'foo',
      barAlias: 'bar',
      bazAlias: 'baz'
    });

    expect(selection.strval).to.equal('fooAlias:foo,barAlias:bar,bazAlias:baz');
  });

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should recurse into nested tuples', function () {
    const selection = new Selection();

    selection.addFields([
      ['fooAlias', 'foo'],
      ['barAlias', 'bar'],
      ['baz', [
        ['quxAlias', 'qux'],
        ['fubAlias', 'fub']
      ]]
    ]);

    expect(selection.strval).to.equal('fooAlias:foo,barAlias:bar,baz{quxAlias:qux,fubAlias:fub}');
  });

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should recurse into nested object hashes', function () {
    const selection = new Selection();

    selection.addFields({
      fooAlias: 'foo',
      barAlias: 'bar',
      bazAlias: {
        quxAlias: 'qux',
        fubAlias: 'fub'
      }
    });

    expect(selection.strval).to.equal('fooAlias:foo,barAlias:bar,bazAlias{quxAlias:qux,fubAlias:fub}');
  });

  /**
   * @test  {Selection#addField}
   * @test  {Selection#strval}
   */
  it('should mix a lists with tuples and object hashes', function () {
    const selection = new Selection();

    selection.addFields([
      'foo', 'bar',
      ['bazAlias', 'baz'],
      ['quxAlias', 'qux'],
      ['fubAlias', {
        corgeAlias : 'corge',
        graultAlias: 'grault',
      }],
      'garply', 'waldo'
    ]);

    expect(selection.strval).to.equal('foo,bar,bazAlias:baz,quxAlias:qux,fubAlias{corgeAlias:corge,graultAlias:grault},garply,waldo');
  });

  /**
   * @test  {Selection#removeField}
   */
  it('should remove a field', function () {
    const selection = new Selection(['foo', 'bar', 'baz']);

    selection.removeField('bar');

    expect(selection.strval).to.equal('foo,baz');
  });

  /**
   * @test  {Selection#removeField}
   */
  it('should ignore removing non-existent fields', function () {
    const selection = new Selection(['foo', 'bar', 'baz']);

    selection.removeField('qux');

    expect(selection.strval).to.equal('foo,bar,baz');
  });

  /**
   * @test  {Selection#\[Symbol.iterator\]}
   */
  it('should be iterable', function () {
    const fields    = ['foo', 'bar', 'baz'],
          selection = new Selection(fields);

    Array.from(selection).forEach(([alias, field], idx) => {
      expect(alias).to.equal(fields[idx]);
      expect(field).to.equal(fields[idx]);
    });
  });

  /**
   * @test {Selection#addFields}
   * @test {Selection#addField}
   * @test {Selection#removeField}
   */
  it('should throw on invalid arguments', function () {
    const selection = new Selection();

    expect(() => { selection.addFields('foo'); }).to.throw(TypeError);
    expect(() => { selection.addFields([new Date()]); }).to.throw(TypeError);
    expect(() => { selection.addField(new Date()); }).to.throw(TypeError);
    expect(() => { selection.addField('foo', []); }).to.throw(TypeError);
    expect(() => { selection.addField([]); }).to.throw(Error);
    expect(() => { selection.removeField([]); }).to.throw(TypeError);
  });
});
