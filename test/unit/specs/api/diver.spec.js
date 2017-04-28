/**
 * @test  {DiverResource}
 */
import DiverResource from 'src/api/diver/resource';
import DiverModel from 'src/api/diver/model';

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
});
