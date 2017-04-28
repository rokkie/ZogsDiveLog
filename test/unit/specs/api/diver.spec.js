/**
 * @test  {DiverResource}
 * @test  {DiverCollection}
 */
import DiverCollection from 'src/api/diver/collection';
import DiverModel from 'src/api/diver/model';
import DiverResource from 'src/api/diver/resource';

describe('Diver API', function () {

  /**
   * @test  {DiverResource#fetchOne}
   */
  it('should fetch a diver', function () {
    const rest     = {findOne: () => {}},
          mock     = sinon.mock(rest),
          resource = new DiverResource(rest),
          data     = {
            first_name   : 'Fred',
            last_name    : 'Spekvet',
            date_of_birth: new Date()
          },
          model    = new DiverModel(data.first_name, data.last_name, data.date_of_birth);

    mock
      .expects('findOne')
      .once()
      .returns(Promise.resolve(data));

    const p = resource.findOne(123).then(actual => {
      expect(actual).to.deep.equal(model);
    });

    mock.verify();

    return p;
  });

  /**
   * @test  {DiverResource#fetchAll}
   */
  it('should fetch a list of divers', function () {
    const rest       = {findAll: () => {}},
          mock       = sinon.mock(rest),
          resource   = new DiverResource(rest),
          data       = [{
            first_name   : 'Fred',
            last_name    : 'Spekvet',
            date_of_birth: new Date()
          }, {
            first_name   : 'Arie',
            last_name    : 'Beuker, de',
            date_of_birth: new Date()
          }, {
            first_name   : 'Ed',
            last_name    : 'Hooijdonck, van',
            date_of_birth: new Date()
          }],
          collection = new DiverCollection([
            new DiverModel(data[0].first_name, data[0].last_name, data[0].date_of_birth),
            new DiverModel(data[1].first_name, data[1].last_name, data[1].date_of_birth),
            new DiverModel(data[2].first_name, data[2].last_name, data[2].date_of_birth)
          ]);

    mock
      .expects('findAll')
      .once()
      .returns(Promise.resolve(data));

    const p = resource.findAll().then(actual => {
      expect(actual).to.deep.equal(collection);
    });

    mock.verify();

    return p;
  });

  /**
   * @test  {DiverCollection#\[Symbol.iterator\]}
   */
  it('should be iterable', function () {
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
});
