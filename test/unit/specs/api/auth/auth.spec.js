import Auth from 'src/api/auth/index';

/**
 * @test  {Auth}
 */
describe('Authentication', () => {

  /**
   * @test  {Auth#login}
   */
  it('should call the login RPC method', () => {
    const rest         = {rpc: () => {}},
          mock         = sinon.mock(rest),
          auth         = new Auth(rest),
          emailAddress = 'foo@example.com',
          password     = 'foobarbazqux';

    mock
      .expects('rpc')
      .withArgs('login', {
        email_address: emailAddress,
        password     : password
      })
      .returns(Promise.resolve(true));

    const p = auth.login(emailAddress, password);

    mock.verify();

    return p;
  });

  /**
   * @test  {Auth#signup}
   */
  it('should call the signup RPC method', () => {
    const rest         = {rpc: () => {}},
          mock         = sinon.mock(rest),
          auth         = new Auth(rest),
          emailAddress = 'foo@example.com',
          password     = 'foobarbazqux',
          firstName    = 'Fred',
          lastName     = 'Spekvet',
          dateOfBirth  = new Date();

    mock
      .expects('rpc')
      .withArgs('signup', {
        email_address: emailAddress,
        password     : password,
        first_name   : firstName,
        last_name    : lastName,
        date_of_birth: dateOfBirth
      })
      .returns(Promise.resolve(true));

    const p = auth.signup(emailAddress, password, firstName, lastName, dateOfBirth);

    mock.verify();

    return p;
  });
});
