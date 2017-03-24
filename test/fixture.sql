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

-- An enabled user (pw: 'wimzusjet')
INSERT INTO auth."user"
  (id, email_address, password, role, enabled, public)
VALUES
  (357, 'user5@example.com', 'wimzusjet', 'divelog_member', false, true);
INSERT INTO public.diver
  (id, first_name, last_name, date_of_birth)
VALUES
  (357, 'Ed', 'Hooydonck, van', '05-05-2005');


-- Dives for user Henk (authenticated user)
INSERT INTO public."dive"
  (diver_id, dive_site_id, dive_nr, depth, date, safety_stop, bottom_time, time_in, time_out, tank_pressure_start, tank_pressure_end, cylinder, water_type)
VALUES
  (123, 1, 10, 15, '01-01-2010', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (123, 1, 11, 15, '02-01-2010', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (123, 1, 12, 15, '03-01-2010', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt');

-- Dives for user Tsjabbe (non-public user, enabled)
INSERT INTO public."dive"
  (diver_id, dive_site_id, dive_nr, depth, date, safety_stop, bottom_time, time_in, time_out, tank_pressure_start, tank_pressure_end, cylinder, water_type)
VALUES
  (159, 1, 21, 15, '01-02-2020', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (159, 1, 22, 15, '02-02-2020', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (159, 1, 23, 15, '03-02-2020', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt');

-- Dives for user Koos (public user, enabled)
INSERT INTO public."dive"
  (diver_id, dive_site_id, dive_nr, depth, date, safety_stop, bottom_time, time_in, time_out, tank_pressure_start, tank_pressure_end, cylinder, water_type)
VALUES
  (789, 1, 30, 15, '01-03-2030', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (789, 1, 31, 15, '02-03-2030', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (789, 1, 32, 15, '03-03-2030', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt');

-- Dives for user Ed (public user, disabled)
INSERT INTO public."dive"
  (diver_id, dive_site_id, dive_nr, depth, date, safety_stop, bottom_time, time_in, time_out, tank_pressure_start, tank_pressure_end, cylinder, water_type)
VALUES
  (357, 1, 40, 15, '01-04-2040', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (357, 1, 41, 15, '02-04-2040', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt'),
  (357, 1, 42, 15, '03-04-2040', TRUE, INTERVAL 'PT45M', '13:00 UTC', '14:00 UTC', 200, 60, (12, 'steel'), 'salt');
