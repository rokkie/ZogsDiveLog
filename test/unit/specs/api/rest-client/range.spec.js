import Range from 'src/api/rest-client/range';

/**
 * @test {Range}
 */
describe('Ranges', function () {

  /**
   * @test  {Range#offset}
   * @test  {Range#limit}
   */
  it('should get and set properties', function () {
    const range = new Range();

    range.offset = 10;
    range.limit  = 100;

    expect(range.offset).to.equal(10);
    expect(range.limit).to.equal(100);
  });

  /**
   * @test {Range#isAll}
   */
  it('should recognise if to range selects all', function () {
    const range = new Range(10, 100);

    expect(range.isAll).to.equal(false);

    range.offset = 0;
    range.limit  = Infinity;

    expect(range.isAll).to.equal(true);
  });

  /**
   * @test  {Range#constructor}
   * @test  {Range#offset}
   * @test  {Range#limit}
   */
  it('should throw on invalid arguments', function () {
    const range = new Range();

    expect(() => { new Range('0'); }).to.throw(TypeError);
    expect(() => { new Range(-1); }).to.throw(RangeError);
    expect(() => { new Range(0, '1'); }).to.throw(TypeError);
    expect(() => { new Range(0, -1); }).to.throw(RangeError);


    expect(() => { range.offset = '0'; }).to.throw(TypeError);
    expect(() => { range.offset = -1; }).to.throw(RangeError);
    expect(() => { range.limit = '0'; }).to.throw(TypeError);
    expect(() => { range.limit = -1; }).to.throw(RangeError);
  });
});
