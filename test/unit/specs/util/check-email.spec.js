import checkEmail from 'src/util/check-email';

/**
 * @test  {check-email}
 */
describe('E-mail check', () => {
  
  /**
   * @test  {check-email}
   */
  it('should test for valid e-mail address', () => {
    const emailValid   = 'foo.bar@baz.tld',
          emailInvalid = 'foobar';
  
    expect(checkEmail(emailValid)).to.be.true;
    expect(checkEmail(emailInvalid)).to.be.false;
  });
});
