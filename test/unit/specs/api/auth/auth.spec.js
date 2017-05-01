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

  /**
   * @test  {Auth#constructor}
   */
  it('should throw on invalid arguments', () => {
    const auth         = new Auth({}),
          emailAddress = 'user@example.com',
          password     = 'foobarbazqux',
          firstName    = 'Fred',
          lastName     = 'Spekvet',
          dateOfBirth  = new Date(),
          futureDate   = new Date();

    futureDate.setDate(dateOfBirth.getDate() + 1);

    expect(() => { auth.signup(0, password, firstName, lastName, dateOfBirth); }).to.throw(TypeError);
    expect(() => { auth.signup('notemail', password, firstName, lastName, dateOfBirth); }).to.throw(RangeError);
    expect(() => { auth.signup(emailAddress, 0, firstName, lastName, dateOfBirth); }).to.throw(TypeError);
    expect(() => { auth.signup(emailAddress, 'foo', firstName, lastName, dateOfBirth); }).to.throw(Error);
    expect(() => { auth.signup(emailAddress, password, 0, lastName, dateOfBirth); }).to.throw(TypeError);
    expect(() => { auth.signup(emailAddress, password, firstName, 0, dateOfBirth); }).to.throw(TypeError);
    expect(() => { auth.signup(emailAddress, password, firstName, lastName, 0); }).to.throw(TypeError);
    expect(() => { auth.signup(emailAddress, password, firstName, lastName, futureDate); }).to.throw(RangeError);
  });
});
