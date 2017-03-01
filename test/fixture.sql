-- generate a password with:
-- select crypt(auth.sha512('the_password'), gen_salt('bf', 10));

-- An enabled user (pw: 'foobarbaz')
INSERT INTO auth."user"
  (id, email_address, password, role, enabled, public)
VALUES
  (123, 'user1@example.com', 'foobarbaz', 'divelog_member', true, false);
INSERT INTO public.diver
  (id, first_name, last_name, date_of_birth)
VALUES
  (123, 'Henk', 'Stubbe', '01-01-2001');

-- A disabled user (pw: 'barbazqux')
INSERT INTO auth."user"
  (id, email_address, password, role, enabled, public)
VALUES
  (456, 'user2@example.com', 'barbazqux', 'divelog_member', false, false);
INSERT INTO public.diver
  (id, first_name, last_name, date_of_birth)
VALUES
  (456, 'Fred', 'Spekvet', '02-02-2002');

-- A public user (pw: 'graultwaldo')
INSERT INTO auth."user"
  (id, email_address, password, role, enabled, public)
VALUES
  (789, 'user3@example.com', 'graultwaldo', 'divelog_member', true, true);
INSERT INTO public.diver
  (id, first_name, last_name, date_of_birth)
VALUES
  (789, 'Koos', 'Korswagen', '03-03-2003');

-- An enabled user (pw: 'aapnootmies')
INSERT INTO auth."user"
  (id, email_address, password, role, enabled, public)
VALUES
  (159, 'user4@example.com', 'aapnootmies', 'divelog_member', true, false);
INSERT INTO public.diver
  (id, first_name, last_name, date_of_birth)
VALUES
  (159, 'Tjabbe', 'Tjibsma', '04-04-2004');
