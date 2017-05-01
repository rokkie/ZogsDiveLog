import DiverModel from 'src/api/diver/model';

/**
 * @test  {DiverModel}
 */
describe('DiverModel', () => {
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
          model       = new DiverModel('foo', 'bar', 0);
    
    model.firstName   = firstName;
    model.lastName    = lastName;
    model.dateOfBirth = dateOfBirth;
    
    expect(model.firstName).to.equal(firstName);
    expect(model.lastName).to.equal(lastName);
    expect(model.dateOfBirth).to.equal(dateOfBirth);
  });

  /**
   * @test  {DiverModel#constructor}
   */
  it('should throw on invalid arguments', () => {
    const firstName   = 'Fred',
          lastName    = 'Spekvet',
          dateOfBirth = new Date(),
          model       = new DiverModel(firstName, lastName, dateOfBirth);
    
    expect(() => { new DiverModel(0, lastName, dateOfBirth); }).to.throw(TypeError);
    expect(() => { new DiverModel(firstName, 0, dateOfBirth); }).to.throw(TypeError);
    expect(() => { new DiverModel(firstName, lastName, 'notdate'); }).to.throw(TypeError);
    expect(() => { model.firstName = 0; }).to.throw(TypeError);
    expect(() => { model.lastName = 0; }).to.throw(TypeError);
    expect(() => { model.dateOfBirth = 'notdate'; }).to.throw(TypeError);
  });
});
