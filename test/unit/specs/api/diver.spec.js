import DiverCollection from 'src/api/diver/collection';
import DiverModel from 'src/api/diver/model';
import DiverResource from 'src/api/diver/resource';

/**
 * @test  {DiverResource}
 * @test  {DiverCollection}
 */
describe('Diver API', () => {
  
  /**
   * @test  {DiverResource.factory}
   */
  it('should create a DiverResource', () => {
    const resource = DiverResource.factory('foo');

    expect(resource).to.be.instanceOf(DiverResource);
  });

  /**
   * @test  {DiverResource#findOne}
   */
  it('should fetch a diver', () => {
    const rest     = {findOne: () => {}},
          mock     = sinon.mock(rest),
          resource = new DiverResource(rest),
          data     = {
            first_name   : 'Fred',
            last_name    : 'Spekvet',
            date_of_birth: '2001-01-01'
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
   * @test  {DiverResource#findAll}
   */
  it('should fetch a list of divers', () => {
    const rest       = {findAll: () => {}},
          mock       = sinon.mock(rest),
          resource   = new DiverResource(rest),
          data       = [{
            first_name   : 'Fred',
            last_name    : 'Spekvet',
            date_of_birth: '2001-01-01'
          }, {
            first_name   : 'Arie',
            last_name    : 'Beuker, de',
            date_of_birth: '2002-02-02'
          }, {
            first_name   : 'Ed',
            last_name    : 'Hooijdonck, van',
            date_of_birth: '2003-03-03'
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
   * @test  {DiverModel#firstName}
   * @test  {DiverModel#lastName}
   * @test  {DiverModel#dateOfBirth}
   */
  it('should get properties passed via constructor', () => {
    const firstName   = 'Fred',
          lastName    = 'Spekvet',
          dateOfBirth = new Date(),
          model       = new DiverModel(firstName, lastName, dateOfBirth);

    expect(model.firstName).to.equal(firstName);
    expect(model.lastName).to.equal(lastName);
    expect(model.dateOfBirth).to.equal(dateOfBirth);
  });

  /**
   * @test  {DiverModel#firstName}
   * @test  {DiverModel#lastName}
   * @test  {DiverModel#dateOfBirth}
   */
  it('should set properties', () => {
    const firstName   = 'Fred',
          lastName    = 'Spekvet',
          dateOfBirth = new Date(),
          model       = new DiverModel();

    model.firstName   = firstName;
    model.lastName    = lastName;
    model.dateOfBirth = dateOfBirth;

    expect(model.firstName).to.equal(firstName);
    expect(model.lastName).to.equal(lastName);
    expect(model.dateOfBirth).to.equal(dateOfBirth);
  });

  /**
   * @test  {DiverCollection#constructor}
   */
  it('should throw on invalid arguments', () => {
    expect(() => { DiverResource.factory(0); }).to.throw(TypeError);
    expect(() => { new DiverCollection('foo'); }).to.throw(TypeError);
    expect(() => { new DiverCollection(['foo']); }).to.throw(TypeError);
  });
});
