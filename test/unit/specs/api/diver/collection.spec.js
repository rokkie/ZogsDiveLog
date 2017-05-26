import DiverModel from 'src/api/diver/model';
import DiverCollection from 'src/api/diver/collection';

/**
 * @test  {DiverCollection}
 */
describe('DiverCollection', () => {

  /**
   * @test  {DiverCollection#constructor}
   */
  it('should be possible to construct without arguments', () => {
    expect(() => {
      const collection = new DiverCollection();
    }).to.not.throw(TypeError);
  });

  /**
   * @test  {DiverCollection#\[Symbol.iterator\]}
   */
  it('should be iterable', () => {
    const diverList  = [
            new DiverModel('Fred', 'Spekvet', new Date()),
            new DiverModel('Arie', 'Beuker, de', new Date()),
            new DiverModel('Ed', 'Hooijdonck, van', new Date())
          ],
          collection = new DiverCollection(diverList);
    
    Array.from(collection).forEach((diver, idx) => {
      expect(diver).to.equal(diverList[idx]);
    });
  });

  /**
   * @test  {DiverCollection#constructor}
   */
  it('should throw on invalid arguments', () => {
    expect(() => { new DiverCollection('foo'); }).to.throw(TypeError);
    expect(() => { new DiverCollection(['foo']); }).to.throw(TypeError);
  });
});
